
import React from 'react'
import { Vollkorn, Poppins } from "next/font/google";
import Image from 'next/image';
import about_one from "../../images/about2.png"
import about_two from "../../images/about1.png"
import client from "../../images/landing2.jpg"

const vollkorn = Vollkorn({ subsets: ["latin"]})
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"]}, )

export const metadata = {
    title: "About Us",
};

const AboutUs = () => {
  return (
    <section className=''>
        <div className='flex items-center lg:flex-row flex-col gap-3 lg:gap-10 md:gap-20 min-h-screen'>
            <div className="">
                <Image placeholder='blur' src={about_one} width={1000} height={1000} alt='about-img' />
            </div>
            <div className="lg:mt-36">
                <Image placeholder='blur' src={about_two} width={1000} height={1000} alt='about-img' />
            </div>
        </div>

        <div className='text-center my-10 lg:my-1 lg:mb-32 font-medium text-sm md:text-[16px] lg:leading-9'>
            <p className={vollkorn.className}>At Evatouch Beauty, we stand as a beacon of excellence in the realm of beauty and hair care. We specialize in providing top-tier virgin human hair extensions and lace systems. Our dedication to quality is unwavering, as we believe that every woman deserves access to the finest and most natural-looking hair products. One of our key strengths lies in our diverse product range, which comprises 100% virgin human hair extensions. We deeply understand the intrinsic value that women place on their hair and makeup, recognizing its profound impact on overall appearance and self-confidence. Therefore, we go above and beyond to deliver nothing short of excellence. Whether you seek voluminous curls, sleek straight styles, or intricate lace systems, Evatouch Beauty has you covered. Our products are designed to enhance your natural beauty and empower you to express yourself with confidence and grace. Join us on a journey of beauty and authenticity, where every strand tells a story of elegance and sophistication.</p>
        </div>

        <div className='flex gap-10 items-center md:flex-row flex-col my-10 md:my-10'>
            <Image placeholder='blur' src={client} width={300} height={300} alt='about-img' className='flex-1 w-full aspect-square' />
            <div className='flex-1'>
                <h1 className='my-3 font-bold text-3xl md:text-5xl'><span className={poppins.className}>Meet the Genius Behind the Brand</span></h1>
                <p className=' font-medium md:font-mediun text-sm md:text-[20px]'><span className={vollkorn.className}><span className='font-black'>Evodie Ngoy</span> has worked in the hair and makeup space for 9 years. She has experience styling hair for all types of occasions and makeup application from birthday makeup to bridal makeup. As the Founder and CEO of Evatouch Beauty, her mission is to ensure that all race, age and gender all over the world no matter the skin type and undertones can enjoy affordable luxury by providing innovative and quality products to cater to all beauty needs locally and across the border</span></p>
            </div>
        </div>
    </section>
  )
}

export default AboutUs;