"use client"
import React, {useContext} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { FaXmark } from "react-icons/fa6";
import LOGO from "../../images/eva.png";
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from 'sonner';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '@/contexts/authContext';

const Page = () => {
    const { setLoading } = useContext(AuthContext)
    const router = useRouter()
    const schema = yup.object().shape({
        email: yup.string().email("Invalid email address").required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const { register, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: yupResolver(schema),
    });
    const adminLogIn = (data)=> {
        setLoading(true)
        if (data.email === "tunmisebabade@gmail.com" && data.password === "admin") {
            toast.success("Welcome Admin!!")
            setLoading(false)
            router.push("/dashboard")
        }else {
            toast.error('Invalid Admin details')
            setLoading(false)
        }
    }

    return (
        <>
            <section className="bg-black min-h-screen flex justify-center items-center">
                <div className="w-[90%] sm:w-[400px] p-5 bg-white rounded-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/"><Image src={LOGO} width={60} height={60} alt="LOGO"/></Link>
                        </div>
                        <Link href="/" className='cursor-pointer'>
                            <FaXmark size={30} />
                        </Link>
                    </div>
                    <p className="text-sm md:text-base text-slate-700 font-medium">Welcome Admin</p>
                    <form  onSubmit={handleSubmit(adminLogIn)}>
                        <div className="my-4">
                            <label className="font-bold" htmlFor="email">Email Address
                                <input {...register("email")} name="email"
                                    type="text" id="email" className="text-base pl-2 h-10 rounded-sm w-full border-2 border-black bg-inputColor" />
                            </label>
                        </div>
                        <div className="my-4">
                            <label className="font-bold" htmlFor="password">Password
                                <input {...register("password")} type="password" name="password" id="password" className="text-base pl-2 h-10 rounded-sm w-full border-2 border-black bg-inputColor" />
                            </label>
                        </div>
                        <p className="text-right my-4 font-bold"><Link href="/forgotPassword">Forgot Password?</Link></p>
                        <button type="submit" className="w-full rounded-sm hover:text-BLUE border-2 border-black hover:bg-transparent hover:text-black duration-300 bg-black py-2 font-semibold text-white text-base md:text-xl">{false ? "loading" : "Login"}</button>
                    </form>
                    
                </div>
            </section>
        </>
    )
}

export default Page