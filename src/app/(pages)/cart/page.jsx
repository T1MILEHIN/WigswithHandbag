"use client";
import { Vollkorn, Poppins } from "next/font/google";
const vollkorn = Vollkorn({ subsets: ["latin"] })
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"] },)
import React from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from "@/contexts/authContext";
import { CartContext } from '@/contexts/cartContext';
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaExclamation } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';




const Page = () => {
    const router = useRouter()
    const { cartItem, setCartItem } = useContext(CartContext);
    const {user} = useContext(AuthContext)

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
            router.push("/")
        }
    }
    const removeItem = (id) => {
        const updatedCart = cartItem.filter((item) => item.id !== id);
        setCartItem(updatedCart);
        localStorage.setItem("cart-item", JSON.stringify(updatedCart))
    };
    return (
        <div className={`${vollkorn.className} min-h-screen md:px-10 px-2 pt-16`}>
            <h1 className="text-xl md:text-4xl font-black">SHOPPING CART</h1>
            <div>
                <p className="font-semibold text-md flex items-end gap-1 my-3"><p className="font-black text-xl">{cartItem.length}</p> {cartItem.length > 1 ? "ITEMS" : "ITEM"} in cart </p>
            </div>
            <section className="grid md:grid-cols-3 grid-cols-1 gap-10">
                <div className="cart-items md:col-span-2">
                    <AnimatePresence popLayout="popLayout">
                        {cartItem.length > 0 ? cartItem.map((item) => (
                            <motion.div exit={{ y: -20, opacity: 0 }} transition={{ type: "spring", duration: 0.3 }} key={item.id} className="py-4 px-2">
                                <div className="flex items-center gap-2 md:gap-4">
                                    <div>
                                        <Image src={item.image} width={50} height={50} className="aspect-square object-cover rounded-md" alt="" />
                                    </div>
                                    <div className="md:flex-[5]">
                                        <p className="text-sm md:text-base font-black">{item.name}</p>
                                        <p className="text-xs">{item.intro}</p>
                                        <p className="text-xs font-medium line-clamp-1">{item.description}</p>
                                    </div>
                                    <div className="flex gap-2 md:gap-4 md:flex-1">
                                        <button onClick={() => removeItem(item.id)} className="font-bold text-xs text-BLUE">REMOVE</button>
                                        <p className="font-black">${item.price}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )) : <h1 className="col-span-3 flex justify-center items-center font-bold text-base md:text-xl">NO ITEM IN YOUR CART</h1>}
                    </AnimatePresence>
                </div>
                <div className="mb-3">
                    <div className="my-8">
                        <h1 className="text-slate-600 text-sm font-bold">TOTAL:</h1>
                        <p className="font-black text-2xl">${cartItem.map((price) => price.price).reduce((acc, cur) => acc + cur, 0)}</p>
                    </div>
                    <button onClick={checkOut} className="duration-300 bg-[#7F6000] hover:bg-white border-2 border-[#7F6000] hover:text-[#7F6000] w-full text-white font-bold py-3 rounded-xl">CHECKOUT</button>
                </div>
            </section>
        </div>
    )
}

export default Page