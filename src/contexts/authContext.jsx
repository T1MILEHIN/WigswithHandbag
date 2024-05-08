"use client"
import { useState, useEffect, createContext } from "react";
import { Toaster, toast } from 'sonner';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from '@/firebase.config';
import { useRouter } from 'next/navigation';
import AuthLoader from "@/components/authLoader";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(() => {
    // Check for window and localStorage existence
    if (typeof window !== 'undefined' && localStorage) {
      try {
        return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        return {}; // or any default value
      }
    }
    return {}; // or any initial value you prefer (for SSR)
  });

  const [userToken, setUserToken] = useState(() => {
    if (typeof window !== 'undefined' && localStorage) {
      try {
        return localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : '';
      } catch (error) {
        console.error("Error parsing token data from localStorage:", error);
        return ''; // or any default value
      }
    }
    return ''; // or any initial value you prefer (for SSR)
  });

  // Consider using a loading state for SSR
  const [loading, setLoading] = useState(false); // Optional for SSR handling

  const googlePopUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider).then((response) => {
        setUser(response?.user);
        setUserToken(response?.user.accessToken);

        toast.success("Welcome to EvaTouch Beauty!");

        localStorage.setItem("token", JSON.stringify(response?.user.accessToken));
        localStorage.setItem("user", JSON.stringify(response?.user));

        router.push("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    setLoading(true); // Optional for UI indication
    try {
      setUser(null);
      setUserToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      signOut(auth);
      setLoading(false); // Optional for UI indication
      toast.success("Logged Out Successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      setLoading(false); // Optional for UI indication
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
        userToken,
        setUserToken,
        googlePopUp,
        logOut,
      }}
    >
      <Toaster position="top-center" />
      <div className="relative">
        {children}
        {loading && <AuthLoader />}
      </div>
    </AuthContext.Provider>
  );
};