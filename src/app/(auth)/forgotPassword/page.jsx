import React from 'react'
import Link from 'next/link'
import { FaChevronLeft } from "react-icons/fa6";

const page = () => {
    return (
        <section className="bg-black min-h-screen flex justify-center items-center">
            <div className="w-[90%] sm:w-[400px] p-5 bg-white rounded-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <Link href="/">Logo</Link>
                    </div>
                </div>
                <div className='flex items-center gap-1'>
                    <p className='cursor-pointer'>
                        <FaChevronLeft size={20} color='black' />
                    </p>
                    <p className="font-bold">Forgot Password?</p>
                </div>
                <p className="text-sm md:text-sm text-slate-700 font-medium">No need to panic, Kindly enter the email address linked with your account</p>
                <form>
                    <div className="my-4">
                        <label className="font-bold" htmlFor="email">Email Address
                            <input name="email"
                                type="text" id="" className="text-base pl-2 h-10 rounded-sm w-full border-2 border-black" />
                        </label>
                    </div>
                    <button type="submit" className="mt-32 w-full rounded-sm hover:text-black border-2 border-black hover:bg-transparent duration-300 bg-BLUE py-2 font-semibold bg-black text-white text-base md:text-xl">Send Code</button>
                </form>
            </div>
        </section>
    )
}

export default page