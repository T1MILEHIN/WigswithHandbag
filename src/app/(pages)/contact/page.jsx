
import { Vollkorn, Poppins } from "next/font/google";

const vollkorn = Vollkorn({ subsets: ["latin"]})
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"]}, )

export const metadata = {
    title: "Contact Me",
};

const ContactPage = () => {
  return (
    <section className="">
        <div className="text-center py-10 md:py-14 px-5 shadow-md md:leading-10">
            <h1 className="font-bold text-lg md:text-4xl"><span className={poppins.className}>We are always available for you!</span></h1>
            <p className="md:text-base text-sm"><span className={vollkorn.className}>Need to make an enquiry or get in touch with us? Send us a mail at evatouchbeauty@gmail.com</span></p>
        </div>

        <p className="my-4 md:my-10 font-light"><span className={vollkorn.className}>Alternatively, you can fill our contact form. We make sure that you get a response as soon as possible</span></p>


        <form action="" className="flex flex-col gap-5 md:gap-10">
            <div>
                <input type="text" name="" id="" placeholder="name" className="border-2 border-black md:h-16 h-12 md:px-5 px-3 text-black w-full" />
            </div>
            <div>
                <input type="text" name="" id="" placeholder="Phone Number" className="border-2 border-black md:h-16 h-12 md:px-5 px-3 text-black w-full" />
            </div>
            <div>
                <input type="text" name="" id="" placeholder="Email" className="border-2 border-black md:h-16 h-12 md:px-5 px-3 text-black w-full" />
            </div>
            <div>
                <textarea name="" id="" cols="30" rows="10" placeholder="Enquiry" className="border-2 border-black w-full resize-none p-2 md:p-5"></textarea>
            </div>

            <button className="my-3 px-3 md:px-5 py-3 bg-white text-black border-2 border-black w-fit font-bold hover:bg-black hover:text-white duration-300">SUBMIT</button>
        </form>
    </section>
  )
}

export default ContactPage