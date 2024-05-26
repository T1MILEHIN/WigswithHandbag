import { Vollkorn, Poppins } from "next/font/google";
const vollkorn = Vollkorn({ subsets: ["latin"] })
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"] },)
import { FaSearch, FaMicrophone } from "react-icons/fa";
import DashboardLinks from "./dashboardLinks";
import { AuthProvider } from "@/contexts/authContext";


export const metadata = {
  title: "DASHBOARD",
};


export default function DashBoardLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:min-h-screen">
          <DashboardLinks />
          <div className="col-span-1 lg:col-span-4 md:p-0 p-2">
            <div className="md:p-5 p-2 flex items-center gap-3 md:gap-10  lg:gap-32">
              <div className="relative search-box flex-1">
                <input type="text" className="pl-10 bg-grayBG w-full h-10 rounded-md md:rounded-xl" placeholder="Search here" />
                <FaMicrophone size={20} className="absolute right-4 top-1/2 -translate-y-1/2" />
                <FaSearch size={20} className="absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="hidden lg:block">
                  <p className="text-xs md:text-base font-semibold">Admin</p>
                </div>
                <div className=" animate-bounce cursor-pointer bg-BLUE w-8 md:w-12 aspect-square rounded-full"></div>
              </div>
            </div>
            <div className={`md:p-5 p-2`}>
              {children}
            </div>
          </div>
        </div>
      </AuthProvider>
    </>
  );
}
