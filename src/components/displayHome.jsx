"use client";
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
        <Parallax
            translateY={["0px", "200px"]}
            scale={[1, 1.5]}
            speed={12}
            easing="easeInQuad"
            className='overflow-hidden'>
            <motion.div variants={containerVariant} initial="initial" animate="animate" className="overflow-hidden bg-image">
                <motion.div variants={imageVariant1} className="lg:block hidden">
                    <Image src={landing1} width={300} height={300} alt="landing-img" className="object-cover" />
                </motion.div>
                <motion.div variants={imageVariant2} className="">
                    <Image src={landing2} width={300} height={300} alt="landing-img" className="object-cover" />
                </motion.div>
                <motion.div variants={imageVariant3} className="lg:block hidden">
                    <Image src={landing3} width={400} height={400} alt="landing-img" className="object-cover" />
                </motion.div>
            </motion.div>
        </Parallax>
      
    )
  }