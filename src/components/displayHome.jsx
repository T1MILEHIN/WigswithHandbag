"use client"
import React from 'react'
import Image from 'next/image'
import landing1 from "../../src/app/images/landing1.jpg"
import landing2 from "../../src/app/images/landing2.jpg"
import landing3 from "../../src/app/images/landing3.jpg"
import { motion } from "framer-motion";
import { Parallax } from 'react-scroll-parallax'

const containerVariant = {
    initial : {
        opacity: 0
    },
    animate : {
        opacity: 1,
        transiiton : {
        type: "spring", duration: 0.5, staggerChildren: 0.4, delayChildren: 0.3
        }
    }
}

const imageVariant1 = {
    initial : {
        opacity: 0,
        x: "-300px"
    },
    animate : {
        opacity: 1,
        x: 0
    }
}

const imageVariant2 = {
    initial : {
        opacity: 0,
        y: "-300px"
    },
    animate : {
        opacity: 1,
        y: 0
    }
}

const imageVariant3 = {
    initial : {
        opacity: 0,
        x: "300px"
    },
    animate : {
        opacity: 1,
        x: 0
    }
}


export default function DisplayHome() {
    return (
        <section
            
            className='overflow-hidden'>
            <Parallax
                translateY={["0px", "20px", "40px"]}
                speed={15}
                easing="easeInQuad"
            >
                <motion.div variants={containerVariant} initial="initial" animate="animate" className="overflow-hidden bg-image py-20 md:py-10">
                    <motion.div variants={imageVariant1} className="lg:block hidden">
                        <Image src={landing1} width={300} height={300} alt="landing-img" className="object-cover" />
                    </motion.div>
                    <motion.div variants={imageVariant2} className="">
                        <Image priority="true" src={landing2} width={300} height={300} alt="landing-img" className="object-cover" />
                    </motion.div>
                    <motion.div variants={imageVariant3} className="lg:block hidden">
                        <Image src={landing3} width={400} height={400} alt="landing-img" className="object-cover" />
                    </motion.div>
                </motion.div>
            </Parallax>
        </section>
      
    )
  }