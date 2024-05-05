"use client";
import React, { useState, useContext } from 'react'
import { FaXmark } from "react-icons/fa6";
import Link from 'next/link';
import { toast } from 'sonner';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/firebase.config';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { AuthContext } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';


const Page = () => {
    const router = useRouter()
    const { loading, setLoading, googlePopUp } = useContext(AuthContext);

    const schema = yup.object().shape({
        email: yup.string().email("Invalid email address").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    });
    const { register, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: yupResolver(schema),
    });
    const createAccount = (data)=> {
        setLoading(true)
        createUserWithEmailAndPassword(auth, data.email, data.password).then((response)=> {
            toast.success("You have successfully Created an account")
            reset();
            setLoading(false)
            router.push("/login")
        }).catch((error) => {
            setLoading(false)
            toast.error("Something went wrong somewhere")
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
    if (errors.email) toast.error(errors.email?.message, {
        duration : 3000
    })
    if (errors.password) toast.error(errors.password?.message, {
        duration : 3000
    })
    return (
        <>
            <section className="bg-black min-h-screen flex justify-center items-center">
                <div className="w-[90%] md:w-[400px] p-5 bg-white rounded-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            Logo
                        </div>
                        <Link href="/" className='cursor-pointer'>
                            <FaXmark size={30} />
                        </Link>
                    </div>
                    <p className="font-bold">Please fill in your details to get started</p>
                    <form onSubmit={handleSubmit(createAccount)}>
                        <div className="my-4">
                            <label className="font-bold" htmlFor="email">Email Address
                                <input {...register("email")} name="email" type="text" id="email" className="text-base pl-2 h-10 rounded-sm w-full border-2 border-black" />
                            </label>
                        </div>
                        <div className="my-4">
                            <label className="font-bold" htmlFor="password">Password
                                <input {...register("password")} name="password"
                                    type="password" id="" className="text-base pl-2 h-10 rounded-sm w-full border-2 border-black" />
                            </label>
                        </div>
                        <div className="my-4">
                            <label className="font-bold" htmlFor="confirmpassword">Confirm Password
                                <input {...register("confirmpassword")} name="confirmpassword"
                                    type="password" id="confirmpassword" className="text-base pl-2 h-10 rounded-sm w-full border-2 border-black" />
                            </label>
                        </div>
                        <button type="submit" className="w-full rounded-sm hover:text-BLUE border-2 border-black active:bg-transparent active:text-black hover:bg-transparent hover:text-black bg-black duration-300 py-2 font-semibold text-white text-base md:text-">{loading ?"Loading" : "Create Account"}</button>
                        <p className='text-center font-extralight py-1'>or</p>
                    </form>
                    <div className='login-options flex flex-col gap-3 font-medium'>
                        <button onClick={googlePopUp} className='flex items-center justify-center gap-2 border-[1px] border-black rounded-3xl py-2 hover:bg-black hover:text-white duration-300'>Continue with Google</button>
                    </div>
                    <p className="text-sm md:text-base mt-4 font-semibold ">Already have an account? <Link className="underline underline-offset-2 text-BLUE" href="/login">Log In</Link></p>
                </div>
            </section>

        </>
    )
}

export default Page