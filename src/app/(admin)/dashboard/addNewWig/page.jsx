"use client"
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { motion } from "framer-motion";
import { collection, getDocs, serverTimestamp } from "firebase/firestore"
import { db } from "@/firebase.config"
import { storage } from '@/firebase.config';
import { addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from 'sonner';
import upload from "../../../images/upload.webp"

const Page = () => {
    const [imageFile, setImageFile] = useState("");
    const [perc, setPerc] = useState(null)
    const [data, setData] = useState({
        name: "",
        price: 0,
        discount: 0,
        image: undefined,
    })
    const handleInput = (e) => {
        const { name, value, type } = e.target;
        setData(prev => (
            {
                ...prev,
                [name]: type === "number" ? +value : value
            }
        ))
        console.log(data.image)
    }
    useEffect(() => {
        const uploadImage = () => {
            const storageRef = ref(storage, `wigs/${imageFile.name + v4()}`)
            const uploadTask = uploadBytesResumable(storageRef, imageFile);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPerc(progress)
                    toast.info(`Uploading ${Math.floor(progress)}%`);
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    toast.error(error.message)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setData(prev => ({ ...prev, image: downloadURL }))
                    });
                }
            );
        }
        imageFile && uploadImage()
    }, [imageFile])

    const postWigs = async () => {
        if (!data.name.trim() || !data.image.trim()) {
            toast.error("Can't leave fields Empty")
            return;
        }
        try {
            const response = await addDoc(collection(db, "wigs"), { ...data, timeStamp: serverTimestamp() });
            console.log(response)
            toast.success("Successfully added!!")
            setData(prev => ({
                ...prev,
                name: "",
                price: 0,
                discount: 0,
                image: undefined,
            }))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex flex-col gap-5 my-4">
            <div className="flex items-center gap-2">
                <div className='group overflow-hidden border-2 border-black'>
                    <label htmlFor="image">
                        <Image src={imageFile ? URL?.createObjectURL(imageFile) : upload} width={150} height={150} alt="preview" className="group-hover:scale-125 duration-300 object-top cursor-pointer aspect-square object-cover" />
                    </label>
                </div>
                <input onChange={(e) => setImageFile(e.target.files[0])} id="image" name="image" className="pl-5 h-8 md:h-10 hidden" type="file" placeholder="" />
            </div>
            <label htmlFor="">Name of Wig:
                <input onChange={handleInput} value={data.name} name="name" className="w-full pl-5 border-2 border-black h-9 md:h-10" type="text" placeholder="name" />
            </label>
            <label htmlFor="">Price:
                <input onChange={handleInput} value={data.price} name="price" className="w-full pl-5 border-2 border-black h-9 md:h-10" type="number" placeholder="price" />
            </label>
            <label htmlFor="">Discount:
                <input onChange={handleInput} value={data.discount} name="discount" className="w-full pl-5 border-2 border-black h-9 md:h-10" type="number" placeholder="discount" />
            </label>
            <motion.button onClick={() => postWigs()} disabled={perc !== null && perc < 100} whileTap={{ scale: 0.95 }} className="bg-black text-white rounded-sm p-2 disabled:bg-red-600 disabled:cursor-not-allowed">UPLOAD WIG</motion.button>
        </div>
    )
}

export default Page