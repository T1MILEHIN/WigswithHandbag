import Image from 'next/image'
import React from 'react'

import bundle_one from "../../images/bundle1.jpg"
import bundle_two from "../../images/bundle2.png"
import bundle_three from "../../images/bundle3.png"
import bundle_four from "../../images/bundle4.png"
import bundle_five from "../../images/bundle5.png"
import bundle_six from "../../images/bundle6.png"


const page = () => {
    return (
        <div className="">
            <h1 className="my-4 text-center font-bold text-xl md:text-3xl">Bundles</h1>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="">
                    <Image placeholder='blur' src={bundle_one} width={1000} height={1000} alt='bundles' />
                    <div className='py-2'>
                        <h2 className='font-semibold'>Raw Indian Bundles  -Wavy</h2>
                        <p className='font-bold'>$75.00</p>
                    </div>
                </div>
                <div className="">
                    <Image placeholder='blur' src={bundle_two} width={1000} height={1000} alt='bundles' />
                    <div className='py-2'>
                        <h2 className='font-semibold'>Raw Indian Bundles  -Wavy</h2>
                        <p className='font-bold'>$70.00</p>
                    </div>
                </div>
                <div className="">
                    <Image placeholder='blur' src={bundle_three} width={1000} height={1000} alt='bundles' />
                    <div className='py-2'>
                        <h2 className='font-semibold'>Raw Indian Bundles  -Wavy</h2>
                        <p className='font-bold'>$65.00</p>
                    </div>
                </div>
                <div className="">
                    <Image placeholder='blur' src={bundle_four} width={1000} height={1000} alt='bundles' />
                    <div className='py-2'>
                        <h2 className='font-semibold'>Raw Indian Bundles  -Curly</h2>
                        <p className='font-bold'>$105.00</p>
                    </div>
                </div>
                <div className="">
                    <Image placeholder='blur' src={bundle_five} width={1000} height={1000} alt='bundles' />
                    <div className='py-2'>
                        <h2 className='font-semibold'>Raw Indian Bundles  -Curly</h2>
                        <p className='font-bold'>$85.00</p>
                    </div>
                </div>
                <div className="">
                    <Image placeholder='blur' src={bundle_six} width={1000} height={1000} alt='bundles' />
                    <div className='py-2'>
                        <h2 className='font-semibold'>Raw Indian Bundles  -Curly</h2>
                        <p className='font-bold'>$125.00</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default page