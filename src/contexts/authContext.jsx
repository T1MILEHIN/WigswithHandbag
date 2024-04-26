"use client";
import { useState, useEffect, createContext } from "react";
import { Toaster, toast } from 'sonner';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from '@/firebase.config';
import { useRouter } from 'next/navigation';
import AuthLoader from "@/components/authLoader";

export const AuthContext = createContext({})
export const AuthProvider = ({children}) => {
    const router = useRouter()
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(false);

    const googlePopUp = async()=> {
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(auth, provider).then((response)=> {
                setUser(response?.user)
                setUserToken(response?.user.accessToken)
                localStorage.setItem("token", JSON.stringify(response?.user.accessToken))
                localStorage.setItem("user", JSON.stringify(response?.user))
                toast.success("Welcome to EvaTouch Beauty!")
                router.push("/")
            })
        } catch (error) {
            console.log(error)
        }
    }
    // Access localStorage after component mounts
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setUserToken(JSON.parse(storedToken));
        }
    }, [user, userToken]);
    const logOut = ()=> {
        setLoading(true)
        try {
            setUser(null)
            setUserToken(null)
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            signOut(auth)
            toast.success("Logged Out Successfully", {
                position: "top-right"
            })
            setTimeout(() => {
                setLoading(false)
                router.push("/login")
            }, 2000);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AuthContext.Provider value={{loading, setLoading, user, setUser, userToken, setUserToken, googlePopUp, logOut}}>
            <Toaster position="top-center" />
            <div className="relative">
                <>
                    {children}
                </>
                {loading && <AuthLoader />}
            </div>
        </AuthContext.Provider>
    )
}
