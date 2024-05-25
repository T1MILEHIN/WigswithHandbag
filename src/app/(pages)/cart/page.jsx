"use client";
import { Vollkorn, Poppins } from "next/font/google";
const vollkorn = Vollkorn({ subsets: ["latin"] })
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"] },)
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from "@/contexts/authContext";
import { CartContext } from '@/contexts/cartContext';
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaExclamation } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { PiSealFill } from 'react-icons/pi'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { DisplayContext } from "@/contexts/displayContext";

const Page = () => {
    const router = useRouter()
    const { cartItem, setCartItem } = useContext(CartContext);
    const {user} = useContext(AuthContext)
    const { FullScreen } = useContext(DisplayContext)

    const checkOut = () => {
        if (!user) {
            toast.error("You have to Login First", {
                cancel: {
                    label: <FaXmark />,
                },
                duration: 4000,
                icon: <FaExclamation color="red" />,
            })
            router.push("/login")
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
            router.push("/checkout");
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
        <div className={`${poppins.className} pt-10`}>
            <h1 className="text-center text-xl md:text-4xl font-black">SHOPPING CART</h1>
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
                                        <LazyLoadImage effect="blur" src={item?.image} className="w-20 aspect-square object-cover rounded-md" alt="" />
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
                <div className="my-4 md:w-[400px]">
                    <div className="flex items-center justify-between">
                        <h1 className="text-sm md:text-base font-semibold">SUB TOTAL</h1>
                        <p className="font-semibold text-2xl">${cartItem?.map((item) => item.price * item.quantity).reduce((acc, cur) => acc + cur, 0)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <h1 className="text-sm md:text-base font-semibold">SHIPING</h1>
                        <p className="font-semibold text-2xl">$50.00</p>
                    </div>
                    <div className="flex items-center justify-between font-bold md:my-6 my-2">
                        <h1 className="text-sm md:text-xl">TOTAL</h1>
                        <p className="font-semibold text-2xl">${(cartItem?.map((item) => item.price * item.quantity).reduce((acc, cur) => acc + cur, 0))}</p>
                    </div>
                    <button onClick={checkOut} className="duration-300 bg-black hover:bg-transparent border-2 border-black hover:text-black w-full md:w-[300px] text-white font-bold py-3 px-4">CHECKOUT</button>
                </div>
            </section>
            <section className={`${poppins.className}`}>
                <div className="flex justify-between items-center md:my-20 my-10">
                    <h1 className="md:text-4xl text-lg font-medium">Information</h1>
                    <p className="underline text-[#9B7002]">Return to Cart</p>
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold md:my-6 my-2">Ordering Process</h2>
                    <div className="flex flex-col gap-3">
                        <div className="flex md:items-center gap-4">
                            <div className="">
                                <PiSealFill size={FullScreen ? 40 : 20} color="#9B7002" />
                            </div>
                            <p className="text-sm md:text-base">Customers can place orders through our website or by contacting our customer service team directly.</p>
                        </div>
                        <div className="flex md:items-center gap-4">
                            <div className="">
                                <PiSealFill size={FullScreen ? 40 : 20} color="#9B7002" />
                            </div>
                            <p className="text-sm md:text-base">Orders are processed and shipped within 2-3 business days after payment confirmation.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold md:my-6 my-2">Payment Method</h2>
                    <div className="flex flex-col gap-3">
                        <div className="flex md:items-center gap-4">
                            <div className="">
                                <PiSealFill size={FullScreen ? 40 : 20} color="#9B7002" />
                            </div>
                            <p className="text-sm md:text-base">We accept payments via Zelle , and other secure online payment methods for now.</p>
                        </div>
                        <div className="flex md:items-center gap-4">
                            <div className="">
                                <PiSealFill size={FullScreen ? 40 : 20} color="#9B7002" />
                            </div>
                            <p className="text-sm md:text-base">All transactions are processed in USD.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold md:my-6 my-2">Shipping</h2>
                    <div className="flex flex-col gap-3">
                        <div className="flex md:items-center gap-4">
                            <div className="">
                                <PiSealFill size={FullScreen ? 40 : 20} color="#9B7002" />
                            </div>
                            <p className="text-sm md:text-base">We offer worldwide shipping.</p>
                        </div>
                        <div className="flex md:items-center gap-4">
                            <div className="">
                                <PiSealFill size={FullScreen ? 40 : 20} color="#9B7002" />
                            </div>
                            <p className="text-sm md:text-base">Shipping costs and estimated delivery times are calculated at checkout.</p>
                        </div>
                        <div className="flex md:items-center gap-4">
                            <div className="">
                                <PiSealFill size={FullScreen ? 40 : 20} color="#9B7002" className="" />
                            </div>
                            <p className="text-sm md:text-base"> Customers are responsible for providing accurate shipping information. We are not liable for any delays or losses due to incorrect address details provided by the customer.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold md:my-6 my-2">Return and Exchanges</h2>
                    <div className="flex md:items-center gap-4">
                        <div className="">
                            <PiSealFill size={FullScreen ? 40 : 20} color="#9B7002" />
                        </div>
                        <p className="text-sm md:text-base">We <span className="font-bold">DO NOT</span> accept returns and exchanges. All sales are final.</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold md:my-6 my-2">Privacy Policy</h2>
                    <div className="flex md:items-center gap-4">
                        <div className="">
                            <PiSealFill size={FullScreen ? 40 : 20} color="#9B7002" />
                        </div>
                        <p className="text-sm md:text-base">We respect the privacy of our customers and protect their personal information. Please refer to our <span className="underline">Privacy Policy</span> for details on how we collect, use, and safeguard your information.</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold md:my-6 my-2">Contact us</h2>
                    <div className="flex md:items-center gap-4">
                        <div className="">
                            <PiSealFill size={FullScreen ? 40 : 20} color="#9B7002" />
                        </div>
                        <p className="text-sm md:text-base"> If you have any questions, concerns, or feedback, please don&apos;t hesitate to contact our customer service team. We are here to assist you and ensure your shopping experience is enjoyable.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page