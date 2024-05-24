"use client"
import { Vollkorn, Poppins } from "next/font/google";
const vollkorn = Vollkorn({ subsets: ["latin"]});
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"]})
import Slider from "@/components/slider";
import { useState, useEffect, useContext } from "react";
import upload from "../../images/upload.webp"
import Image from 'next/image'
import { motion } from "framer-motion";
import { collection, getDocs, serverTimestamp } from "firebase/firestore"
import { db } from "@/firebase.config"
import { storage } from '@/firebase.config';
import { addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from 'sonner';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loading from "../loading";
import { CartContext } from "@/contexts/cartContext";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const Page = () => {
  const { addToCart } = useContext(CartContext);
  const [allWigs, setAllWigs] = useState([])
  const [loadingWigs, setLoadingWigs] = useState(false)
  const [quantity, setQuantity] = useState([])

  useEffect(() => {
    const fetchWigs = async () => {
      setLoadingWigs(true);
      let wigs = [];
      try {
        const querySnapshot = await getDocs(collection(db, "wigs"));
        querySnapshot.forEach((doc) => {
          wigs.push({ id: doc.id, ...doc.data() })
        });
        setAllWigs(wigs)
        setLoadingWigs(false)
      } catch (error) {
        console.log(error)
        setLoadingWigs(false)
      }
    }
    fetchWigs();
  }, [])

  const increase = (wig)=> {
    const existingCartItem = quantity.find(item => item.id === wig.id);
    if (!existingCartItem){
      setQuantity(prev => ([...prev, { ...wig, quantity: 1 }]));
    } else {
      setQuantity(prev => (
        prev.map(item => (
          item.id === wig.id ? { ...item, quantity: item.quantity + 1 } : item
        ))
      ))
    }
  }
  const decrease = (WIG)=> {
    setQuantity(prevWigs => (
      prevWigs.map(wig => (
        wig.id ===  WIG.id? { ...wig, quantity: wig.quantity > 0 ? wig.quantity - 1 : 0 } : wig
      ))
    ));
  }


  return (
    <div className="">
      <h1 className="my-2 md:mb-32 text-center font-bold text-xl md:text-6xl text-black">Wigs</h1>
      <section className="">
        <div className="relative flex justify-between my-4">
          <div>
            <h1 className={`${poppins.className} font-bold text-2xl md:text-4xl`}>New Arrivals</h1>
            <p className={`${vollkorn.className} text-base md:text-lg`}>Shop our range of products and embrace your unique radiance</p>
          </div>
        </div>
        <Slider />
      </section>
      <div className="md:my-24">
        <h1 className={`${poppins.className} font-bold text-2xl md:text-4xl`}>Top Picks For You</h1>
        <p className={`${vollkorn.className} text-base md:text-lg`}>Shop our range of products and embrace your unique radianc</p>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-0">
        {loadingWigs && <div className="lg:col-span-3 md:col-span-2 col-span-1"><Loading /></div>}
        {(!loadingWigs && allWigs) &&
        allWigs?.map((wig, index) => (
          <div key={index} className="w-full aspect-square lg:p-3 lg:hover:bg-white rounded-md duration-200">
            <div className="relative group overflow-hidden rounded-md">
              <LazyLoadImage effect="blur" src={wig.image} alt={wig.name} className="w-full aspect-square" />
              <div className="rounded-md absolute top-0 bottom-2 left-0 right-0 bg-black bg-opacity-60 invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-300 lg:flex hidden  justify-center items-center">
                <motion.button onClick={() => addToCart(quantity.filter((item)=> item.quantity !== 0).find((item)=> item.id === wig.id), setQuantity)} whileTap={{ scale: 0.8 }} className={`${poppins.className} shadow-lg bg-white text-black px-3 py-2 rounded-sm -translate-y-20 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 duration-300 font-medium`}>ADD TO CART</motion.button>
              </div>
            </div>
            <div className='py-2 flex items-center justify-between'>
              <div className="flex flex-col gap-2">
                <h2 className='font-semibold text-base'>{wig.name}</h2>
                <p className='font-bold text-xs'>${wig.price}.00</p>
              </div>
              <div className={`flex items-center gap-2 md:text-2xl`}>
                <motion.span onClick={()=> decrease(wig)} whileTap={{scale: 0.90}} className="font-bold cursor-pointer"><FaMinus /></motion.span>
                <span className={poppins.className}>{quantity?.find((item)=> item.id === wig.id)?.quantity || 0}</span>
                <motion.span onClick={()=> increase(wig)} whileTap={{scale: 0.90}} className="font-bold cursor-pointer"><FaPlus /></motion.span>
              </div>
            </div>
            <div className="lg:hidden block">
              <motion.button onClick={() => addToCart(quantity.filter((item)=> item.quantity !== 0).find((item)=> item.id === wig.id), setQuantity)} whileTap={{ scale: 0.8 }} className={`${poppins.className} w-full bg-white text-black px-3 py-2 rounded-sm duration-300 font-medium`}>ADD TO CART</motion.button>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Page;
