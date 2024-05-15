"use client"
import React from 'react'
import Link from 'next/link'
import { FaXmark } from "react-icons/fa6";
import LOGO from "../../images/eva.png";
import Image from 'next/image';

const page = () => {
    return (
        <>
            <section className="bg-black min-h-screen flex justify-center items-center">
                <div className="md:w-[400px] p-5 bg-white rounded-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/"><Image src={LOGO} width={60} height={60} alt="LOGO"/></Link>
                        </div>
                        <Link href="/" className='cursor-pointer'>
                            <FaXmark size={30} />
                        </Link>
                    </div>
                    <p className="font-bold">Welcome Admin!</p>
                    <p className="text-sm md:text-base text-slate-700 font-medium">Welcome Admin</p>
                    <form>
                        <div className="my-4">
                            <label className="font-bold" htmlFor="email">Email Address
                                <input name="email"
                                    type="text" id="" className="text-base pl-2 h-10 rounded-sm w-full border-2 border-black bg-inputColor" />
                            </label>
                        </div>
                        <div className="my-4">
                            <label className="font-bold" htmlFor="password">Password
                                <input type="password" name="password" id="" className="text-base pl-2 h-10 rounded-sm w-full border-2 border-black bg-inputColor" />
                            </label>
                        </div>
                        <p className="text-right my-4 font-bold"><Link href="/forgotPassword">Forgot Password?</Link></p>
                        <button type="submit" className="w-full rounded-sm hover:text-BLUE border-2 border-black hover:bg-transparent hover:text-black duration-300 bg-black py-2 font-semibold text-white text-base md:text-xl">{false ? "loading" : "Login"}</button>
                        <p className='text-center font-extralight py-1'>or</p>
                    </form>
                    <div className='login-options flex flex-col gap-3 font-medium'>
                        <button className='flex items-center justify-center gap-2 border-[1px] border-black rounded-3xl py-2 hover:bg-black hover:text-white duration-300'>Continue with Google</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page