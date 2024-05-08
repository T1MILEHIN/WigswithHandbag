"use client"
import { useState, useEffect, createContext } from "react";
import { Toaster, toast } from 'sonner';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from '@/firebase.config';
import { useRouter } from 'next/navigation';
import AuthLoader from "@/components/authLoader";

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const router = useRouter()
    const [user, setUser] = useState(()=> localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {});
    const [userToken, setUserToken] = useState(()=> localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : {});
    const [loading, setLoading] = useState(false);

    const googlePopUp = async()=> {
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(auth, provider).then((response)=> {
                setUser(response?.user)
                setUserToken(response?.user.accessToken)
    
                toast.success("Welcome to EvaTouch Beauty!")
                
                localStorage.setItem("token", JSON.stringify(response?.user.accessToken))
                localStorage.setItem("user", JSON.stringify(response?.user))

                router.push("/")
            })
        } catch (error) {
            console.log(error)
        }
    }
    const logOut = ()=> {
        setLoading(true)
        try {
            setUser(null)
            setUserToken(null)
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            signOut(auth)
            setLoading(false)
            toast.success("Logged Out Successfully", {
                position: "top-right"
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
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
