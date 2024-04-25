import wig_one from "../../images/wig1.png"
import wig_two from "../../images/wig2.png"
import wig_three from "../../images/wig3.png"
import wig_four from "../../images/wig4.png"
import wig_five from "../../images/wig5.png"
import wig_six from "../../images/wig6.png"
import Image from 'next/image'
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase.config"
import { storage } from '@/firebase.config';



const FetchWigs = async () => {
  try {
    const response = await fetch("https://wigandhandbag-1b82e-default-rtdb.firebaseio.com/wigs.json");
    if (!response.ok) {
      throw new Error('Failed to fetch wigs data');
    }
    // const data = await response.json();
    // return data;
    return response;
  } catch (error) {
    console.error('Error fetching wigs:', error);
    return [];
  }
}

const getData = async()=> {
  const valRef = collection(db, "wigs")
  const dataOb = getDocs(valRef)
  return dataOb
}

const page = async() => {
  const data = await getData()
  console.log(data)
  return (
    <div className="">
      <h1 className="my-4 text-center font-bold text-xl md:text-3xl">Wigs</h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={wig_one} width={1000} height={1000} alt='wigs'/>
          <div className='py-2'>
            <h2 className='font-semibold'>The Kim K wig</h2>
            <p className='font-bold'>$750.00</p>
          </div>
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={wig_two} width={1000} height={1000} alt='wigs'/>
          <div className='py-2'>
            <h2 className='font-semibold'>The Audrey Wig</h2>
            <p className='font-bold'>$730.00</p>
          </div>
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={wig_three} width={1000} height={1000} alt='wigs'/>
          <div className='py-2'>
            <h2 className='font-semibold'>The Ava Wig</h2>
            <p className='font-bold'>$550.00</p>
          </div>
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={wig_four} width={1000} height={1000} alt='wigs'/>
          <div className='py-2'>
            <h2 className='font-semibold'>The Eva Wig</h2>
            <p className='font-bold'>$320.00</p>
          </div>
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={wig_five} width={1000} height={1000} alt='wigs'/>
          <div className='py-2'>
            <h2 className='font-semibold'>The Kelly Wig</h2>
            <p className='font-bold'>$120.00</p>
          </div>
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={wig_six} width={1000} height={1000} alt='wigs'/>
          <div className='py-2'>
            <h2 className='font-semibold'>The Khloe Wig</h2>
            <p className='font-bold'>$250.00</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page