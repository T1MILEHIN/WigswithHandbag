import React from 'react'

const Page = () => {
  return (
    <div>
        <div className="flex justify-between items-center">
            <h1 className='font-bold md:text-5xl text-xl'>SHIPPING DETAILS</h1>
            <p className="underline">LOGGED IN OR NOT</p>
        </div>
        <form action="" method="post">
            <div className='flex flex-col gap-5 md:gap-10 md:my-8 my-4'>
                <div>
                    <select name="" id="" className='px-6 w-full border-2 border-black rounded-md bg-transparent h-12 md:h-16'>
                        <option value="">U.S.A</option>
                        <option value="">NIGERIA</option>
                        <option value="">CHINA</option>
                    </select>
                </div>
                <div>
                    <input type="text" name="" id="" className="placeholder:text-black pl-6 w-full border-2 border-black rounded-md bg-transparent h-12 md:h-16" placeholder='Email/Phone Number' />
                </div>
                <div className='flex md:flex-row flex-col gap-5 md:gap-10'>
                    <div className='flex-1'>
                        <input type="text" name="" id="" className="placeholder:text-black pl-6 w-full border-2 border-black rounded-md bg-transparent h-12 md:h-16" placeholder='Firstname' />
                    </div>
                    <div className='flex-1'>
                        <input type="text" name="" id="" className="placeholder:text-black pl-6 w-full border-2 border-black rounded-md bg-transparent h-12 md:h-16" placeholder='Lastname' />
                    </div>
                </div>
                <div className=''>
                    <input type="text" name="" id="" className="placeholder:text-black pl-6 w-full border-2 border-black rounded-md bg-transparent h-12 md:h-16" placeholder='Address' />
                </div>
                <div className=''>
                    <input type="text" name="" id="" className="placeholder:text-black pl-6 w-full border-2 border-black rounded-md bg-transparent h-12 md:h-16" placeholder='Appartment' />
                </div>
                <div className='flex md:flex-row flex-col gap-5 md:gap-10'>
                    <div className='flex-1'>
                        <input type="text" name="" id="" className="placeholder:text-black pl-6 w-full border-2 border-black rounded-md bg-transparent h-12 md:h-16" placeholder='City' />
                    </div>
                    <div className='flex-1'>
                        <select name="" id="" className='px-6 w-full border-2 border-black rounded-md bg-transparent h-12 md:h-16'>
                            <option disabled value="">State</option>
                        </select>
                    </div>
                    <div className='flex-1'>
                        <input type="text" name="" id="" className="placeholder:text-black pl-6 w-full border-2 border-black rounded-md bg-transparent h-12 md:h-16" placeholder='Postal Code' />
                    </div>
                </div>
            </div>

            <div className="md:my-6 my-2">
                <h1 className='font-bold md:text-5xl text-base'>Shipping Method</h1>
            </div>
        </form>
    </div>
  )
}

export default Page