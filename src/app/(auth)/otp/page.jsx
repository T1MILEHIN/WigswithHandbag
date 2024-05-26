"use client"
import React from 'react'
import Link from 'next/link';
import OtpInputControl from '@/components/otpInput';

const page = () => {

    return (
        <section className="min-h-screen flex justify-center items-center bg-black">
            <div className="border-2 border-black sm:w-[400px] p-5 bg-white rounded-sm">
                <div>
                    <Link href="/">LOGO</Link>
                </div>
                <div className='flex items-center gap-1'>
                    <p className="font-bold">OTP Verification</p>
                </div>
                <p className="text-sm md:text-sm text-slate-700 font-medium">Enter the Verification code that was just sent to your email address</p>
                <div className='my-4 px-5 md:px-8'>
                    <OtpInputControl />
                </div>
                <button type="submit" className="my-6 w-full rounded-sm text-white bg-black hover:text-BLUE border-2 hover:bg-transparent border-BLUE duration-300 bg-BLUE py-2 font-semibold text-base md:text-xl">Verify</button>
                <p className="text-sm md:text-base mt-4 font-semibold ">Didn&apos;t receive code? <span className='text-BLUE font-bold underline'>Resend</span></p>
            </div>

        </section>
    )
}

export default page