'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { PiSealFill } from 'react-icons/pi'

const Page = () => {
  const [service, setService] = useState('')
  function selectService(e){
    setService(e.target.value)
    console.log('hello')
  }
  console.log(service);
  return (
    <div className=''>
      <div className="mb-10 lg:mb-16">
        <Image src='/images/book-bg.png' alt='' width={1440} height={414} className='w-full' />
      </div>
        {/* <div className='book_bg'>
            <p className='text-center font-bold text-sm lg:text-2xl'>WELCOME TO OUR BOOKING PAGE</p>
        </div> */}


        <section className='lg:text-2xl mb-14'>
          <div className='mb-8 lg:mb-16'>
            <h3 className='font-bold text-lg lg:text-3xl mb-4 lg:mb-8'>Policy</h3>
            <ul className='flex flex-col gap-3'>
              <li className='flex gap-4 items-center'>
                <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
                <p>A confirmation text will be sent latest 24 hours prior to your appointment. <span className='font-bold'>NO confirmation = NO Appointment.</span></p>
              </li>
              <li className='flex gap-4 items-center'>
                <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
                <p>A Non-Refundable $40 booking fee is required to secure appointment & will go towards your remaining balance.</p>
              </li>
              <li className='flex gap-4 items-center'>
                <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
                <p>Remaining balance is CASH/ZELLE ONLY on the day of scheduled appointment.</p>
              </li>
            </ul>
          </div>

          <div className='mb-8 lg:mb-16'>
            <h3 className='font-bold text-lg lg:text-3xl mb-4 lg:mb-8'>Time, Cancellation and Reschedule</h3>
            <ul className='flex flex-col gap-3'>
              <li className='flex gap-4 items-center'>
                <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
                <p>1. For any reason you need to cancel an appointment, all deposits are for <span className='font-bold'>NON-refundable & reusable</span> future appointments.</p>
              </li>
              <li className='flex gap-4 items-center'>
                <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
                <div>
                  <p>If the makeup artist needs to cancel for any reason, deposit will be refunded via the card put on file. Zelle, cash app & apple pay will not be issued for refunds.</p>
                  <p>Please allow up to 72 hours to post to account.</p>
                </div>
              </li>
              <li className='flex gap-4 items-center'>
                <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
                <p>You will be banned from booking with me again if you do a <span className='font-bold'>“NO CALL NO SHOW”.</span></p>
              </li>
              <li className='flex gap-4 items-center'>
                <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
                Remaining balance is CASH/ZELLE ONLY on the day of scheduled appointment.
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-bold text-lg lg:text-3xl mb-4 lg:mb-8'>{`Client's`} Appearance</h3>
            <ul className='flex flex-col gap-3'>
              <li className='flex gap-4 items-center'>
                <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
                <p>Clients are expected to arrive with a clean, moisturized face free of makeup, including foundation, concealer, and eye makeup.</p>
              </li>
              <li className='flex gap-4 items-center'>
                <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
                <p>Eyebrows should be groomed and shaped prior to the appointment.</p>
              </li>
            </ul>
          </div>
        </section>

        <section className='lg:text-2xl'>
          <h3 className='font-bold text-lg lg:text-3xl mb-4 lg:mb-8'>Choose a service</h3>
          <div className='flex justify-between items-center border-b-2 py-4 border-b-zinc-300'>
            <p>Hair Installation</p>
            <label htmlFor="hair-inst" className={`bg-black min-w-40 lg:w-52 h-16 lg:h-24 text-white flex items-center justify-center cursor-pointer hover:opacity-70 ${service === 'hair installation' ? 'opacity-70' : ''}`}>SELECT
              <input type="radio" name="service" value='hair installation' id="hair-inst" className='hidden' onChange={selectService} />
            </label>
          </div>

          <div className='flex justify-between items-center border-b-2 py-4 border-b-zinc-300'>
            <p>Soft Glam</p>
            <label htmlFor="soft-glam" className={`bg-black min-w-40 lg:w-52 h-16 lg:h-24 text-white flex items-center justify-center cursor-pointer hover:opacity-70 ${service === 'soft glam' ? 'opacity-70' : ''}`}>SELECT
              <input type="radio" name="service" value='soft glam' id="soft-glam" className='hidden' onChange={selectService} />
            </label>
          </div>

          <div className='flex justify-between items-center border-b-2 py-4 border-b-zinc-300'>
            <p>Bridal Makeup</p>
            <label htmlFor="bridal-makeup" className={`bg-black min-w-40 lg:w-52 h-16 lg:h-24 text-white flex items-center justify-center cursor-pointer hover:opacity-70 ${service === 'bridal makeup' ? 'opacity-70' : ''}`}>SELECT
              <input type="radio" name="service" value='bridal makeup' id="bridal-makeup" className='hidden' onChange={selectService} />
            </label>
          </div>

          <div className='flex justify-between items-center border-b-2 py-4 border-b-zinc-300'>
            <p>Hair & Makeup Combo</p>
            <label htmlFor="hair&makeup" className={`bg-black min-w-40 lg:w-52 h-16 lg:h-24 text-white flex items-center justify-center cursor-pointer hover:opacity-70 ${service === 'hair & makeup combo' ? 'opacity-70' : ''}`}>SELECT
              <input type="radio" name="service" value='hair & makeup combo' id="hair&makeup" className='hidden' onChange={selectService} />
            </label>
          </div>
        </section>
    </div>
  )
}

export default Page;