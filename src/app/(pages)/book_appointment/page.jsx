'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { PiSealFill } from 'react-icons/pi'

const Page = () => {
  const [service, setService] = useState('')
  function selectService(e) {
    setService(e.target.value)
    console.log('hello')
  }
  console.log(service);
  return (
    <div className=''>
      <div className="mb-10 lg:mb-16">
        <Image src='/images/book-bg.png' alt='' width={1440} height={414} className='w-full' />
      </div>
      <section className='mb-14'>
        <div className='mb-8 lg:mb-16'>
          <h2 className='text-xl md:text-2xl font-semibold md:my-6 my-2'>Policy</h2>
          <ul className='flex flex-col gap-3'>
            <li className='flex gap-4 items-center'>
              <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
              <p className="text-sm md:text-base">A confirmation text will be sent latest 24 hours prior to your appointment. <span className='font-bold'>NO confirmation = NO Appointment.</span></p>
            </li>
            <li className='flex gap-4 items-center'>
              <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
              <p className="text-sm md:text-base">A Non-Refundable $40 booking fee is required to secure appointment & will go towards your remaining balance.</p>
            </li>
            <li className='flex gap-4 items-center'>
              <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
              <p className="text-sm md:text-base">Remaining balance is CASH/ZELLE ONLY on the day of scheduled appointment.</p>
            </li>
          </ul>
        </div>

        <div className='mb-8 lg:mb-16'>
          <h2 className='text-xl md:text-2xl font-semibold md:my-6 my-2'>Time, Cancellation and Reschedule</h2>
          <ul className='flex flex-col gap-3'>
            <li className='flex gap-4 items-center'>
              <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
              <p className="text-sm md:text-base">1. For any reason you need to cancel an appointment, all deposits are for <span className='font-bold'>NON-refundable & reusable</span> future appointments.</p>
            </li>
            <li className='flex gap-4 items-center'>
              <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
              <div>
                <p className="text-sm md:text-base">If the makeup artist needs to cancel for any reason, deposit will be refunded via the card put on file. Zelle, cash app & apple pay will not be issued for refunds.</p>
                <p className="text-sm md:text-base">Please allow up to 72 hours to post to account.</p>
              </div>
            </li>
            <li className='flex gap-4 items-center'>
              <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
              <p className="text-sm md:text-base">You will be banned from booking with me again if you do a <span className='font-bold'>“NO CALL NO SHOW”.</span></p>
            </li>
            <li className='flex gap-4 items-center'>
              <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
              Remaining balance is CASH/ZELLE ONLY on the day of scheduled appointment.
            </li>
          </ul>
        </div>

        <div>
          <h2 className='text-xl md:text-2xl font-semibold md:my-6 my-2'>{`Client's`} Appearance</h2>
          <ul className='flex flex-col gap-3'>
            <li className='flex gap-4 items-center'>
              <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
              <p className="text-sm md:text-base">Clients are expected to arrive with a clean, moisturized face free of makeup, including foundation, concealer, and eye makeup.</p>
            </li>
            <li className='flex gap-4 items-center'>
              <span className='text-2xl lg:text-4xl text-[#9B7002]'><PiSealFill /></span>
              <p className="text-sm md:text-base">Eyebrows should be groomed and shaped prior to the appointment.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className='lg:text-2xl'>
        <h2 className='text-xl md:text-2xl font-semibold md:my-6 my-2'>Choose a service</h2>
        <div className="flex flex-col gap-2">
          <div className='flex justify-between items-center p-2 bg-white'>
            <p className="font-semibold text-sm md:text-base">Hair Installation</p>
            <label htmlFor="hair-inst" className={`bg-black min-w-40 lg:w-52 h-12 lg:h-16 text-white flex items-center justify-center cursor-pointer hover:opacity-70 ${service === 'hair installation' ? 'opacity-70' : ''}`}>SELECT
              <input type="radio" name="service" value='hair installation' id="hair-inst" className='hidden' onChange={selectService} />
            </label>
          </div>
          <div className='flex justify-between items-center p-2 bg-white'>
            <p className="font-semibold text-sm md:text-base">Soft Glam</p>
            <label htmlFor="soft-glam" className={`bg-black min-w-40 lg:w-52 h-12 lg:h-16 text-white flex items-center justify-center cursor-pointer hover:opacity-70 ${service === 'soft glam' ? 'opacity-70' : ''}`}>SELECT
              <input type="radio" name="service" value='soft glam' id="soft-glam" className='hidden' onChange={selectService} />
            </label>
          </div>
          <div className='flex justify-between items-center p-2 bg-white'>
            <p className="font-semibold text-sm md:text-base">Bridal Makeup</p>
            <label htmlFor="bridal-makeup" className={`bg-black min-w-40 lg:w-52 h-12 lg:h-16 text-white flex items-center justify-center cursor-pointer hover:opacity-70 ${service === 'bridal makeup' ? 'opacity-70' : ''}`}>SELECT
              <input type="radio" name="service" value='bridal makeup' id="bridal-makeup" className='hidden' onChange={selectService} />
            </label>
          </div>
          <div className='flex justify-between items-center p-2 bg-white'>
            <p className="font-semibold text-sm md:text-base">Hair & Makeup Combo</p>
            <label htmlFor="hair&makeup" className={`bg-black min-w-40 lg:w-52 h-12 lg:h-16 text-white flex items-center justify-center cursor-pointer hover:opacity-70 ${service === 'hair & makeup combo' ? 'opacity-70' : ''}`}>SELECT
              <input type="radio" name="service" value='hair & makeup combo' id="hair&makeup" className='hidden' onChange={selectService} />
            </label>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page;