"use client"
import React, { useState, useContext } from 'react'
import { FaXmark } from "react-icons/fa6";
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from 'sonner';
import { AuthContext } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';


const Page = () => {
    const router = useRouter()
    const { loading, setLoading, setUser, userToken, setUserToken, googlePopUp } = useContext(AuthContext)
    const schema = yup.object().shape({
        email: yup.string().email("Invalid email address").required("Email is required"),
        password: yup.string().required("Password is required"),
    });
    const { register, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: yupResolver(schema),
    });
    if (errors.email) toast.error(errors.email?.message, {
        duration : 3000
    })
    if (errors.password) toast.error(errors.password?.message, {
        duration : 3000
    })
    const logIn = (data)=> {
        setLoading(true)
        signInWithEmailAndPassword(auth, data.email, data.password).then((response)=> {
            setUser(response?.user)
            setUserToken(response?.user.accessToken)
            localStorage.setItem("token", JSON.stringify(response?.user.accessToken))
            // localStorage.setItem("user", JSON.stringify(response?.user))
            toast.success("Welcome to EvaTouch Beauty!")
            setLoading(false)
            reset()
            router.push("/")
        }).catch((error)=> {
            console.log(error)
            toast.error("Invalid Credentials")
            setLoading(false)
        })
    }
    return (
        <>
            <section className="bg-black min-h-screen flex justify-center items-center">
                <div className="md:w-[400px] p-5 bg-white rounded-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/">LOGO</Link>
                        </div>
                        <Link href="/" className='cursor-pointer'>
                            <FaXmark size={30} />
                        </Link>
                    </div>
                    <p className="font-bold">Welcome Back!</p>
                    <p className="text-sm md:text-base text-slate-700 font-medium">Enter Your details to continue</p>
                    <form onSubmit={handleSubmit(logIn)}>
                        <div className="my-4">
                            <label className="font-bold" htmlFor="email">Email Address
                                <input {...register("email")} name="email"
                                    type="text" id="" className="text-base pl-2 h-10 rounded-sm w-full border-2 border-black bg-inputColor" />
                            </label>
                        </div>
                        <div className="my-4">
                            <label {...register("password")} className="font-bold" htmlFor="password">Password
                                <input type="password" name="password" id="" className="text-base pl-2 h-10 rounded-sm w-full border-2 border-black bg-inputColor" />
                            </label>
                        </div>
                        <p className="text-right my-4 font-bold"><Link href="/forgotPassword">Forgot Password?</Link></p>
                        <button type="submit" className="w-full rounded-sm hover:text-BLUE border-2 border-black active:bg-transparent active:text-black hover:bg-transparent hover:text-black duration-300 bg-black py-2 font-semibold text-white text-base md:text-xl">Login</button>
                        <p className='text-center font-extralight py-1'>or</p>
                    </form>
                    <div className='login-options flex flex-col gap-3 font-medium'>
                        <button onClick={googlePopUp} className='flex items-center justify-center gap-2 border-[1px] border-black rounded-3xl py-2 hover:bg-black hover:text-white duration-300'>Continue with Google</button>
                    </div>
                    <p className="text-sm md:text-base mt-4 font-semibold ">Don&apos;t have an account? <Link className="underline underline-offset-2 text-BLUE" href="/createAccount">Create Account</Link></p>
                </div>

            </section>
        </>
    )
}

export default Page