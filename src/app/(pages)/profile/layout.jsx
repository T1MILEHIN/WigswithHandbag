import { Vollkorn, Poppins } from "next/font/google";
import Link from "next/link";
const vollkorn = Vollkorn({ subsets: ["latin"]})
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"]}, )


export default function ProfilePageLayout({ children }) {
    return (
        <>
            <section className={poppins.className}>
                <div className="flex">
                    <div className="border-2 my-2 md:my-4 flex flex-col gap-4">
                        <Link href="/profile">Profile</Link>
                        <Link href="/profile/delete-account">Delete Account</Link>
                    </div>
                    <div className="flex-1 border-2">
                        {children}
                    </div>
                </div>
            </section>
        </>
    )

}