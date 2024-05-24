"use client"
import { Vollkorn, Poppins } from "next/font/google";
const vollkorn = Vollkorn({ subsets: ["latin"]});
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"]})

import Image from 'next/image'
import React, { useState, useEffect, useContext } from 'react'
import upload from "../../images/upload.webp"
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
import { CartContext } from "@/contexts/cartContext";
import Loading from '../loading';

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";


const Page = () => {
    const { addToCart } = useContext(CartContext)
    const [allBundles, setAllBundles] = useState([])
    const [loadingBundles, setLoadingBundles] = useState(false)
    const [quantity, setQuantity] = useState([])

    useEffect(() => {
        const fetchBundles = async () => {
            setLoadingBundles(true)
            let bundles = [];
            try {
                const querySnapshot = await getDocs(collection(db, "bundles"));
                querySnapshot.forEach((doc) => {
                    bundles.push({ id: doc.id, ...doc.data() })
                });
                setAllBundles(bundles)
                setLoadingBundles(false)
            } catch (error) {
                console.log(error)
                setLoadingBundles(false)
            }
        }
        fetchBundles();
    }, [])

    const increase = (bundle) => {
        const existingCartItem = quantity.find(item => item.id === bundle.id);
        if (!existingCartItem) {
            setQuantity(prev => ([...prev, { ...bundle, quantity: 1 }]));
        } else {
            setQuantity(prev => (
                prev.map(item => (
                    item.id === bundle.id ? { ...item, quantity: item.quantity + 1 } : item
                ))
            ))
        }
    }
    const decrease = (BUNDLE) => {
        setQuantity(prevWigs => (
            prevWigs.map(bundle => (
                bundle.id === BUNDLE.id ? { ...wig, quantity: bundle.quantity > 0 ? bundle.quantity - 1 : 0 } : bundle
            ))
        ));
    }

    return (
        <div className="">
            <h1 className="my-2 md:mb-32 text-center font-bold text-xl md:text-6xl text-black">Bundles</h1>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-0">
                {loadingBundles && <div className="lg:col-span-3 md:col-span-2 col-span-1"><Loading /></div>}
                {(!allBundles && !loadingBundles)  ? <h1 className='col-span-1 md:col-span-3 text-center'>No Available Bundle Right Now. Check Back Later</h1> : (
                    allBundles.map((bundle, index) => (
                        <div key={index} className="w-full aspect-square lg:p-3 lg:hover:bg-white rounded-md duration-200">
                            <div className="relative group overflow-hidden rounded-md">
                                <LazyLoadImage effect="blur" src={bundle.image} alt={bundle.name} className="w-full aspect-square rounded-md" />
                                <div className="rounded-md absolute top-0 bottom-2 left-0 right-0 bg-black bg-opacity-60 invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-300 lg:flex hidden justify-center items-center">
                                    <motion.button onClick={() => addToCart(quantity.filter((item)=> item.quantity !== 0).find((item)=> item.id === bundle.id), setQuantity)} whileTap={{ scale: 0.8 }} className={`${poppins.className} shadow-lg bg-white text-black px-3 py-2 rounded-sm -translate-y-20 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 duration-300 font-medium`}>ADD TO CART</motion.button>
                                </div>
                            </div>
                            <div className='py-2 flex items-center justify-between'>
                                <div className="flex flex-col gap-2">
                                    <h2 className='font-semibold text-sm'>{bundle.name}</h2>
                                    <p className='font-bold text-xs'>${bundle.price}</p>
                                </div>
                                <div className={`flex items-center gap-4 text-sm md:text-2xl`}>
                                    <motion.span onClick={() => decrease(bundle)} whileTap={{ scale: 0.95 }} className=""><FaMinus /></motion.span>
                                    <span className={vollkorn.className}>{quantity.find((item) => item.id === bundle.id)?.quantity || 0}</span>
                                    <motion.span onClick={() => increase(bundle)} whileTap={{ scale: 0.95 }} className=""><FaPlus /></motion.span>
                                </div>
                            </div>
                            <div className="lg:hidden block">
                                <motion.button onClick={() => addToCart(quantity.filter((item)=> item.quantity !== 0).find((item)=> item.id === bundle.id), setQuantity)} whileTap={{ scale: 0.8 }} className={`${poppins.className} w-full bg-white text-black px-3 py-2 rounded-sm duration-300 font-medium`}>ADD TO CART</motion.button>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </div>
    )
}

export default Page;