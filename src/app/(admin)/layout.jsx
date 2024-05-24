"use client"
import { Vollkorn } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/contexts/authContext";

const vollkorn = Vollkorn({ subsets: ["latin"] })
  
export default function AdminAuthLayout({ children }) {
    return (
        <div className={vollkorn.className}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </div>
    );
}
