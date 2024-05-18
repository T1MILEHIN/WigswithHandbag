"use client"
import { useRef } from "react";
import { Vollkorn, Poppins } from "next/font/google";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Parallax } from 'react-scroll-parallax';
import Image from "next/image";
import wed_one from "../app/images/wed1.png"
import wed_two from "../app/images/wed2.png"
import wed_three from "../app/images/wed3.png"

import glam_one from "../app/images/glam1.png"
import glam_two from "../app/images/glam2.png"
import glam_three from "../app/images/glam3.png"

const vollkorn = Vollkorn({ subsets: ["latin"]})
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"]}, )

import { useState } from 'react'
import Link from 'next/link'


const optionContainer = {
    initial: {
        y: "-50px",
        scale: 0
    },
    animate: {
        y: 0,
        scale: 1,
        transition: {
            type: "spring", duration: 0.5
        }
    },
    exit : {
        y: "-50px",
        scale: 0,
        transition: {
            type: "spring", duration: 0.5
        }
    }
}


const containerVariant = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.4, delayChildren: 0.3, staggerChildren: 0.4, type: "spring"
        }
    }
}

const divChildVariant = {
    initial: {
        scale: 0
    },
    animate: {
        scale: 1,
    }
}

const Options = () => {
    const [glam, setGlam] = useState(false)
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true})
    return (
        <>
            <Parallax
                speed={10}
                translateY={['0px', '-80px']}
                className='overflow-hidden'
            >
                <div className="my-4 shadow-md p-3 md:p-6 w-fit mx-auto overflow-hidden bg-white">
                    <div className="flex justify-center items-center gap-3 md:gap-10">
                        <motion.button whileTap={{scale: 1.05}} onClick={() => setGlam(false)} className={`px-4 md:px-6 py-4 ${!glam && "bg-black text-white"} `}>Bridal MakeUp</motion.button>
                        <motion.button whileTap={{scale: 1.05}} onClick={() => setGlam(true)} className={`px-4 md:px-6 py-4 text-black ${glam && "bg-black text-white"}`}>Soft Glam</motion.button>
                    </div>
                </div>
                <AnimatePresence>
                    {glam ?
                        <motion.section variants={optionContainer} initial="initial" animate={glam ? "animate" : "initial"} exit="exit" className="lg:px-20 px-4">
                            <motion.div className="text-center my-10">
                                <h1 className={`${poppins.className} font-bold text-xl md:text-3xl my-2 md:my-4`}>Have an event coming up?</h1>
                                <p className={`${vollkorn.className} md:w-[700px] text-base md:text-lg mx-auto`}>Whether it’s a special occasion or you just want to feel fabulous, we will help you create a flawless look that leaves you feeling glamorous and make you the star of the show. Secure your spot and get ready to slay</p>
                                <Link href="/">
                                    <button className="my-3 px-4 md:px-5 py-3 bg-transparent text-black border-2 border-black">Book Apointment</button>
                                </Link>
                            </motion.div>
                            <Parallax
                            >
                                <motion.section ref={ref} variants={containerVariant} initial="initial" animate={isInView ? "animate" : "initial"} className="flex flex-wrap md:flex-row flex-col gap-10 items-center justify-between">
                                    <motion.div variants={divChildVariant} className="flex-1 w-fit">
                                        <Image placeholder="blur" src={glam_one} width={1000} height={1000} alt="glam-image-one" />
                                    </motion.div>
                                    <motion.div variants={divChildVariant} className="flex-1 w-fit">
                                        <Image placeholder="blur" src={glam_two} width={1000} height={1000} alt="glam-image-two" />
                                    </motion.div>
                                    <motion.div variants={divChildVariant} className="flex-1 w-fit">
                                        <Image placeholder="blur" src={glam_three} width={1000} height={1000} alt="glam-image-three" />
                                    </motion.div>
                                </motion.section>
                            </Parallax>
                        </motion.section>
                        :
                        <motion.section variants={optionContainer} initial="animate" exit="exit" className="lg:px-20 px-4">
                            <motion.div className="text-center my-10">
                                <h1 className={`${poppins.className} font-bold text-xl md:text-3xl my-2 md:my-4`}>Is your big day on the way?</h1>
                                <p className={`${vollkorn.className} md:w-[700px] text-base md:text-lg mx-auto`}>Get ready to say ‘<span className="font-black">I DO</span>’ in style with our exceptional bridal makeup services. At Evatouch beauty, we are equipped with all that it takes to make you look absolutely stunning and make you the most beautiful bride ever.</p>
                                <Link href="/softglam">
                                    <button className="my-3 px-4 md:px-5 py-3 bg-transparent text-black border-2 border-black">Book Apointment</button>
                                </Link>
                            </motion.div>
                            <Parallax
                            >
                                <motion.section ref={ref} variants={containerVariant} initial="initial" animate={isInView ? "animate" : "initial"} className="flex flex-wrap md:flex-row flex-col gap-10 items-center justify-between">
                                <motion.div variants={divChildVariant} className="flex-1 w-fit">
                                    <Image placeholder="blur" src={wed_one} width={1000} height={1000} alt="wedding-image-one" />
                                </motion.div>
                                <motion.div variants={divChildVariant} className="flex-1 w-fit">
                                    <Image placeholder="blur" src={wed_two} width={1000} height={1000} alt="wedding-image-two" />
                                </motion.div>
                                <motion.div variants={divChildVariant} className="flex-1 w-fit">
                                    <Image placeholder="blur" src={wed_three} width={1000} height={1000} alt="wedding-image-three" />
                                </motion.div>
                                </motion.section>
                            </Parallax>
                        </motion.section>
                    }
                </AnimatePresence>
            </Parallax>
        </>
    )
}

export default Options