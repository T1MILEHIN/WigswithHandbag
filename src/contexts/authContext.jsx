"use client";
import { useState, useEffect, createContext } from "react";
import { Toaster, toast } from "sonner";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged  } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useRouter } from "next/navigation";
import AuthLoader from "@/components/authLoader";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(); // Initial empty state
  const [currentUser, setCurrentUser] = useState(null)
  const [userToken, setUserToken] = useState(); // Initial empty state
  const [loading, setLoading] = useState(false); // Optional for SSR

  // Fetch data from localStorage on component mount (optional for SSR)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserToken(user.accessToken);
        setCurrentUser(auth?.currentUser)
        localStorage.setItem("token", JSON.stringify(user.accessToken));
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setUser(null);
        setUserToken(null);
        setCurrentUser(null)
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (localStorage) {
      try {
        setUser(
          localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null
        );
        setUserToken(
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null
        );
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
      }
    }
  }, []);

  const googlePopUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider).then((response) => {
        setUser(response?.user);
        setUserToken(response?.user.accessToken);
        toast.success("Welcome to EvaTouch Beauty!");
        localStorage.setItem(
          "token",
          JSON.stringify(response?.user.accessToken)
        );
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
      signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setUserToken(null);
      setLoading(false); // Optional for UI indication
      toast.success("Logged Out Successfully", {
        duration: 2000
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
        currentUser
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
