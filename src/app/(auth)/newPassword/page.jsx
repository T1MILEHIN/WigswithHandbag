"use client"
import React from 'react'
import Link from 'next/link'
import { FaChevronLeft } from "react-icons/fa6";

const page = () => {
    return (
        <section className="min-h-screen flex justify-center items-center bg-black">
            <div className="border-2 border-black w-[90%] sm:w-[400px] p-5 bg-white rounded-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <Link href="/">LOGO</Link>
                    </div>
                </div>
                <div className='flex items-center gap-1'>
                    <p className='cursor-pointer'>
                        <FaChevronLeft size={20} color='black' />
                    </p>
                    <p className="font-bold">Good to have you Back</p>
                </div>
                <p className="text-sm md:text-sm text-slate-700 font-medium">Please ensure your new password is unique from those previously used</p>
                <form>
                    <div className="my-4">
                        <label className="font-bold" htmlFor="confirm-new-password">Enter Password
                            <input name="confirm-new-password"
                                type="password" id="" className="text-base pl-2 h-10 rounded-sm w-full border-2 border-black" />
                        </label>
                    </div>

                    <button type="submit" className="mt-28 w-full rounded-sm hover:text-black text-white bg-black border-2 hover:bg-transparent border-BLUE duration-300 bg-BLUE py-2 font-semibold text-base md:text-xl">Login</button>
                </form>
            </div>
        </section>
    )
}

export default page