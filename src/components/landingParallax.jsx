"use client"
import React from 'react'
import { Parallax } from 'react-scroll-parallax'
import Image_one from "../app/images/image1.png";
import Image_two from "../app/images/image2.png";
import Image_three from "../app/images/image3.png";
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from "react-icons/fa6";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const landingContainer = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4, delayChildren: 0.7, staggerChildren: 0.5, type: "spring"
    }
  }
}

const landingContainerChildren = {
  initial: {
    x: "-100px",
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
  }
}


const LandingParallax = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true})
  return (
    <Parallax
        opacity={['1', '1', '0']}
        scale={[1, 0.75]}
        easing="easeInQuad"
        className='overflow-hidden'
      >
        <motion.section ref={ref} variants={landingContainer} initial="initial" animate={isInView ? "animate" : "initial"} className="flex flex-wrap md:flex-row flex-col gap-10 items-center justify-between overflow-hidden py-8 md:px-20 px-4 ">
          <motion.div variants={landingContainerChildren} className="origin-botton flex justify-center items-center flex-1  w-full aspect-square bg-[#E04E68]">
            <Image src={Image_one} width={1000} height={1000} alt='image-one' />
          </motion.div>
          <motion.div variants={landingContainerChildren} className="origin-bottom flex justify-center items-center flex-1 w-full aspect-square bg-[#7EF4ED]">
            <Image src={Image_two} width={1000} height={1000} alt='image-two' />
          </motion.div>
          <motion.div variants={landingContainerChildren} className='origin-bottom'>
            <Link href="/bundles">
              <div className="flex-1 w-full aspect-square">
                <div className='bg-[#EBE5E5] p-4'>
                  <Image src={Image_three} width={300} height={300} alt='image-one' />
                </div>
                <div className='p-4 flex items-center justify-between gap-4'>
                  Bundles <FaArrowRightLong />
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.section>
      </Parallax>
  )
}


export default LandingParallax