"use client";
import { Vollkorn, Poppins } from "next/font/google";
const vollkorn = Vollkorn({ subsets: ["latin"] })
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"] },)
import React from 'react';
import Image from 'next/image';
import { useEffect, useContext } from 'react';
import { AuthContext } from "@/contexts/authContext";
import { CartContext } from '@/contexts/cartContext';
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaExclamation } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from "next/link";
import { db } from "@/firebase.config"
import { storage } from '@/firebase.config';
import { ref } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const Page = () => {
    const router = useRouter()
    const { cartItem, setCartItem } = useContext(CartContext);
    const {user} = useContext(AuthContext)

    // useEffect(()=> {
    //     const fetchCartWig = async()=> {
    //         const wigsAndBundles = [];
    //         const queryWigSnapshot = await getDocs(collection(db, "wigs"));
    //         const queryBundleSnapshot = await getDocs(collection(db, "bundles"));
    //         queryWigSnapshot.forEach((doc) => {
    //             // console.log(doc.data());
    //             wigsAndBundles.push(doc.data())
    //         });
    //         queryBundleSnapshot.forEach((doc) => {
    //             // console.log(doc.data());
    //             wigsAndBundles.push(doc.data())
    //         });
    //         console.log(wigsAndBundles)
    //         console.log(wigsAndBundles.find((item)=> {
    //             cartItem.forEach((cartItem=> {
    //                 cartItem.id === item.id
    //             }))
    //         } ));
    //     }
    //     fetchCartWig();
    // }, [])

    const checkOut = () => {
        if (!user) {
            toast.error("You have to Login First", {
                cancel: {
                    label: <FaXmark />,
                },
                duration: 4000,
                icon: <FaExclamation color="red" />,
            })
            setTimeout(() => {
                router.push("/login")
            }, 5000);
        }
        if (cartItem.length === 0 && user) {
            toast.error("Oops, Your cart is empty", {
                cancel: {
                    label: <FaXmark />,
                },
                duration: 4000,
                icon: <FaExclamation color="red" />,
            })
            toast('Would you like to check out our wigs and bundles', {
                action: {
                    label: <FaCheck color="green" />,
                    onClick: () => navigate("/wigs")
                },
                cancel: {
                    label: <FaXmark color="red" />,
                },
                classNames: {
                    actionButton: 'bg-slate-300',
                },
            });
        }
        if (user) {
            router.push("/cart")
        }
    }
    const removeItem = (id) => {
        const updatedCart = cartItem.filter((item) => item.id !== id);
        setCartItem(updatedCart);
        localStorage.setItem("cart-item", JSON.stringify(updatedCart))
    };
    const increaseQuantity = (cartItem)=> {
        setCartItem(prev=> (
            prev.map((item)=> item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item)
        ))
    }
    const decreaseQuantity = (cartItem)=> {
        setCartItem(prev=> (
            prev.map((item)=> item.id === cartItem.id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : cartItem.quantity === 0  ? removeItem(cartItem.id) : item)
        ))
    }
    return (
        <div className={`${vollkorn.className} min-h-screen pt-10`}>
            <h1 className="text-xl md:text-4xl font-black">SHOPPING CART</h1>
            <div>
                <p className="font-semibold text-md flex items-end gap-1 my-3"><p className="font-black text-xl">{cartItem.length}</p> {cartItem.length > 1 ? "ITEMS" : "ITEM"} in cart </p>
            </div>
            <section className="">
                <div className="cart-items">
                    <AnimatePresence popLayout="popLayout">
                        {cartItem.length > 0 ? cartItem.map((item) => (
                            <motion.div exit={{ y: -20, opacity: 0 }} transition={{ type: "spring", duration: 0.3 }} key={item?.id} className="py-4 px-2">
                                <div className="flex items-center gap-2 md:gap-4">
                                    <div>
                                        <Image src={item?.image} width={50} height={50} className="aspect-square object-cover rounded-md" alt="" />
                                    </div>
                                    <div className="md:flex-1">
                                        <p className="text-sm md:text-base font-black">{item?.name}</p>
                                    </div>
                                    <div className={`md:flex-1 flex items-center gap-4 text-sm`}>
                                        <motion.span onClick={()=> decreaseQuantity(item)} whileTap={{ scale: 0.95 }} className="curser-pointer"><FaMinus /></motion.span>
                                        <span className={vollkorn.className}>{item?.quantity}</span>
                                        <motion.span onClick={()=> increaseQuantity(item)} whileTap={{ scale: 0.95 }} className="cursor-pointer"><FaPlus /></motion.span>
                                    </div>
                                    <div className="flex justify-between gap-2 md:gap-4 md:flex-1">
                                        <p className="font-black">${(item?.price * item.quantity)}</p>
                                        <button onClick={() => removeItem(item?.id)} className="font-bold text-2xl text-[#7F6000]"><FaXmark color="#7F6000"/></button>
                                    </div>
                                </div>

                            </motion.div>
                        )) : <h1 className="flex justify-center items-center font-bold text-base md:text-xl">NO ITEM IN YOUR CART</h1>}
                    </AnimatePresence>
                    <Link href="/wigs">
                        <p className="my-3 underline text-[#7F6000]">Continue Shopping</p>
                    </Link>
                </div>
                <hr />
                <div className="my-3">
                    <div className="">
                        <h1 className="text-slate-600 text-sm font-bold">TOTAL:</h1>
                        <p className="font-black text-2xl">${cartItem?.map((item) => item.price * item.quantity).reduce((acc, cur) => acc + cur, 0)}</p>
                    </div>
                    <button onClick={checkOut} className="duration-300 bg-[#7F6000] hover:bg-white border-2 border-[#7F6000] hover:text-[#7F6000] w-fit text-white font-bold py-3 px-4">CHECKOUT</button>
                </div>
            </section>
        </div>
    )
}

export default Page