"use client"
import { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase.config";
import { storage } from '@/firebase.config';
import { addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AuthContext } from "@/contexts/authContext";

const Page = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)

  return (
    <section className="">
      <h1 className="font-bold lg:text-3xl">WELCOME {currentUser?.displayName}</h1>
      <p>View all users</p>
    </section>
  )
}

export default Page