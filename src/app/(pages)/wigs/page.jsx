"use client"
import { useState, useEffect, useContext } from "react";
import upload from "../../images/upload.webp"
import Image from 'next/image'
import { motion } from "framer-motion";
import { collection, getDocs, serverTimestamp } from "firebase/firestore"
import { db } from "@/firebase.config"
import { storage } from '@/firebase.config';
import { addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from 'sonner';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loading from "../loading";
import { CartContext } from "@/contexts/cartContext";

const Page = () => {
  const { addToCart } = useContext(CartContext);
  const [allWigs, setAllWigs] = useState([])
  const [imageFile, setImageFile] = useState("");
  const [perc, setPerc] = useState(null)
  const [data, setData] = useState({
    name: "",
    price: "",
    discount: "",
    image: undefined,
  })
  const handleInput = (e)=> {
    const {name , value, type} = e.target;
    setData(prev=> (
      {
        ...prev,
        [name] : type === "number" ? +value : value
      }
    ))
    console.log(data.image)
  }
  useEffect(()=> {
    const uploadImage = ()=> {
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
            setData(prev=> ({...prev, image: downloadURL}))
          });
        }
      );
    }
    imageFile && uploadImage()
  }, [imageFile])

  const postWigs = async()=> {
    if (!data.name.trim() || !data.image.trim() || !data.price.trim()) {
      toast.error("Can't leave fields Empty")
      return;
  }
    try {
      const response = await addDoc(collection(db,"wigs"), {...data, timeStamp: serverTimestamp()});
      console.log(response)
      toast.success("Successfully added!!")
      setData(prev=> ({
        ...prev,
        name: "",
        price: "",
        discount: "",
        image: undefined,
      }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    const fetchWigs = async()=>{
      let wigs = [];
      try {
        const querySnapshot = await getDocs(collection(db, "wigs"));
        querySnapshot.forEach((doc) => {
          wigs.push({id: doc.id, ...doc.data()})
        });
        setAllWigs(wigs)
      }catch(error){
        console.log(error)
      }
    }
    fetchWigs();
  }, [])


  return (
    <div className="">
      <h1 className="my-2 text-center font-bold text-xl md:text-3xl text-[#7F6000]">Wigs</h1>
      <div className="flex flex-col gap-5 my-4">
        <div className="flex items-center gap-2">
          <label htmlFor="image">
            <Image src={imageFile ? URL?.createObjectURL(imageFile) : upload} width={100} height={100}  alt="preview" className=" cursor-pointer w-20 aspect-square rounded-full border-2 border-black object-cover" />
          </label>
          <input onChange={(e)=> setImageFile(e.target.files[0])} id="image" name="image" className="pl-5 h-8 md:h-10 hidden" type="file" placeholder="" />
        </div>
        <input onChange={handleInput} value={data.name} name="name" className="w-full pl-5 border-2 border-black h-9 md:h-10" type="text" placeholder="name" />
        <input onChange={handleInput} value={data.price} name="price" className="w-full pl-5 border-2 border-black h-9 md:h-10" type="number" placeholder="price" />
        <input onChange={handleInput} value={data.discount} name="discount" className="w-full pl-5 border-2 border-black h-9 md:h-10" type="number" placeholder="discount" />
        <motion.button onClick={()=> postWigs()} disabled={perc !== null && perc < 100} whileTap={{scale: 0.95}} className="bg-black text-white rounded-sm p-2 disabled:bg-red-600 disabled:cursor-not-allowed">UPLOAD</motion.button>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {allWigs?.map((wig, index)=> (
          <div key={index} className="w-full aspect-square">
            <div className="relative group">
              <LazyLoadImage effect="blur" src={wig.image} alt={wig.name} className="w-full"/>
              <div className="absolute top-0 bottom-2 left-0 right-0 bg-black bg-opacity-60 invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-300 flex justify-center items-center">
                <motion.button onClick={()=> addToCart(wig)} whileTap={{scale: 0.8}} className="shadow-lg bg-white text-black p-2 rounded-sm -translate-y-20 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 duration-300">ADD TO CART</motion.button>
              </div>
            </div>
            <div className='py-2'>
              <h2 className='font-semibold'>{wig.name}</h2>
              <p className='font-bold'>${wig.price}.00</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Page



