"use client"
import { Vollkorn, Poppins, Philosopher } from "next/font/google";
const vollkorn = Vollkorn({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"] })
const philosopher = Philosopher({ subsets: ["latin"], weight: ["400","700"]})
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
import { FaCartPlus } from "react-icons/fa6";
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

  const increase = (wig) => {
    const existingCartItem = quantity.find(item => item.id === wig.id);
    if (!existingCartItem) {
      setQuantity(prev => ([...prev, { ...wig, quantity: 1 }]));
    } else {
      setQuantity(prev => (
        prev.map(item => (
          item.id === wig.id ? { ...item, quantity: item.quantity + 1 } : item
        ))
      ))
    }
  }
  const decrease = (WIG) => {
    setQuantity(prevWigs => (
      prevWigs.map(wig => (
        wig.id === WIG.id ? { ...wig, quantity: wig.quantity > 0 ? wig.quantity - 1 : 0 } : wig
      ))
    ));
  }


  return (
    <div className="">
      <h1 className="my-2 md:mb-32 text-center font-bold text-2xl md:text-6xl text-black">Wigs</h1>
      <section className="">
        <div className="relative flex justify-between my-4">
          <div>
            <h1 className={`${poppins.className} font-bold text-2xl md:text-4xl mb-2`}>New Arrivals</h1>
            <p className={`${vollkorn.className} text-base md:text-lg`}>Shop our range of products and embrace your unique radiance</p>
          </div>
        </div>
        <Slider />
      </section>
      <div className="md:my-24 my-12">
        <h1 className={`${poppins.className} font-bold text-2xl md:text-4xl mb-2`}>Top Picks For You</h1>
        <p className={`${vollkorn.className} text-base md:text-lg`}>Shop our range of products and embrace your unique radianc</p>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-6">
        {loadingWigs && <div className="lg:col-span-3 md:col-span-2 col-span-1"><Loading /></div>}
        {(!loadingWigs && allWigs) &&
          allWigs?.map((wig, index) => (
            <div key={index} className="w-full aspect-square rounded-xl cursor-pointer">
              <div className="relative group overflow-hidden duration-300 rounded-xl">
                <div className="group-hover:scale-125 rounded-xl relative overflow-hidden duration-300 h-[380px]">
                  <div className="rounded-xl z-10 absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60"></div>
                  <LazyLoadImage effect="blur" src={wig.image} alt={wig.name} className="relative w-screen aspect-square rounded-xl object-cover" />
                </div>
                <div className={`${philosopher.className} z-20 absolute top-4 left-4 text-[#c9bcac] font-medium`}>
                  <h2 className='font-semibold text-xl'>{wig.name}</h2>
                </div>
                <div className="rounded-xl p-2 flex items-center justify-between bg-[#c9bcac] absolute z-20 right-4 lg:group-hover:right-14 duration-300 left-4 bottom-6">
                  <div className={` flex-1 flex items-center gap-4`}>
                    <motion.span onClick={() => decrease(wig)} whileTap={{ scale: 0.95 }} className=""><FaMinus size={20} /></motion.span>
                    <span className={`${poppins.className} w-[40px] text-center`}>{quantity.find((item) => item.id === wig.id)?.quantity || 0}</span>
                    <motion.span onClick={() => increase(wig)} whileTap={{ scale: 0.95 }} className=""><FaPlus size={20} /></motion.span>
                  </div>
                  <div className="">
                    <p className='font-bold text-sm'>${(wig.price) * quantity.find((item) => item.id === wig.id)?.quantity || 0}</p>
                  </div>
                </div>
                <motion.div onClick={() => addToCart(quantity.filter((item) => item.quantity !== 0).find((item) => item.id === wig.id), setQuantity)} whileHover={{ rotate: 20 }} whileTap={{ scale: 0.95 }} className="duration-300 invisible opacity-0 -right-32 rounded-full z-20 absolute lg:group-hover:visible lg:group-hover:-right-2 lg:group-hover:opacity-100 -bottom-2 border-[10px] border-[#c9bcac] bg-transparent">
                  <FaCartPlus size={40} className="bg-[#c9bcac]" />
                </motion.div>
              </div>
              <div className="lg:hidden block mt-2">
                <motion.button onClick={() => addToCart(quantity.filter((item) => item.quantity !== 0).find((item) => item.id === bundle.id), setQuantity)} whileTap={{ scale: 0.8 }} className={`${poppins.className} w-full bg-white text-black px-3 py-2 rounded-xl duration-300 font-medium`}>ADD TO CART</motion.button>
              </div>
            </div>
          ))}
      </section>
    </div>
  )
}

export default Page;
