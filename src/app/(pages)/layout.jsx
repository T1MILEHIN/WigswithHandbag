import "../globals.css"
import { Vollkorn, Poppins } from "next/font/google";

const vollkorn = Vollkorn({ subsets: ["latin"]})
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"]}, )

import Header from "@/components/header";
import Footer from "@/components/footer";


export default function PageLayout({ children }) {
    return (
        <>
            <div className={`${poppins.className}`}>
                <Header />
                <div className="md:py-32 py-20 lg:px-20 px-4">
                    {children}
                </div>
            </div>
            <Footer />
        </>
    )

}