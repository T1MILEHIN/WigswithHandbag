"use client"
import React, { useState, useEffect } from 'react'
import { collection, getDocs, serverTimestamp } from "firebase/firestore"
import { db } from "@/firebase.config"
import { storage } from '@/firebase.config';
import { addDoc } from "firebase/firestore";

const Page = () => {
  const [allWigs, setAllWigs] = useState([])
  useEffect(() => {
    const fetchWigs = async () => {
      let wigs = [];
      try {
        const querySnapshot = await getDocs(collection(db, "wigs"));
        querySnapshot.forEach((doc) => {
          wigs.push({ id: doc.id, ...doc.data() })
        });
        setAllWigs(wigs)
      } catch (error) {
        console.log(error)
      }
    }
    fetchWigs();
  }, [])
  console.log(allWigs)
  return (
    <div>
      <h1 className='lg:text-3xl font-bold text-center'>UPDATE OR DELETE</h1>
      <div>
        <h1>UPDATE</h1>
        <select name="" id="" className="w-full pl-5 border-2 border-black h-9 md:h-10">
          {allWigs.map((wig)=> (
            <option key={wig.id} value={wig.name}>{wig.name}</option>
          ))}
        </select>

        <section>
          <input type="text" className="w-full pl-5 border-2 border-black h-9 md:h-10" />
        </section>
      </div>
    </div>
  )
}

export default Page