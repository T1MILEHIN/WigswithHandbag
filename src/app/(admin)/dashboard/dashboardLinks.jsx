"use client"
import React, {useState, useContext} from 'react'
import { MdDashboard, MdOutlineViewList } from "react-icons/md";
import { FaUserGroup, FaBarsStaggered, FaXmark, FaLink } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { DisplayContext } from '@/contexts/displayContext';


const navVariant = {
  initial: {
    y: "-100%",
  },
  final: {
    y: "40px",
    transition: {
      type: "linear", duration: 0.2, delayChildren: 0.3, staggerChildren: 0.3
    }
  }
}

const liVariant = {
  initial: {
    opacity: 0,
    y: "-50px"
  },
  final: {
    opacity: 1,
    y: 0
  }
}

const DashboardLinks = () => {
  const pathname = usePathname()
  const { FullScreen } = useContext(DisplayContext)
  const [nav, showNav] = useState(false);
  const displayNav = () => {
    showNav(prev => !prev)
  }
  return (
    <>
      <div className="cursor-pointer w-full bg-white ml-auto flex justify-end items-end lg:hidden py-2 z-50 pr-3">{nav ? <FaXmark onClick={displayNav} size={30} /> : <FaBarsStaggered onClick={displayNav} size={30} />}</div>
      <motion.div className={`${!nav && "top-[-100%] lg:top-0"} z-10 absolute w-full lg:relative lg:col-span-1 lg:bg-black lg:flex justify-center lg:pt-20 lg:leading-[50px] leading-[40px]`}>
        <motion.ul variants={navVariant} animate={(nav && !FullScreen)? "final" : !FullScreen ? "initial" : "" } className="bg-black font-semibold flex flex-col gap-1 md:gap-4 md:p-0 p-3">
          <motion.li variants={liVariant} className="">
            <Link className={`${pathname === "/dashboard" ? "bg-white text-[#7F6000] rounded-md flex gap-2 items-center md:px-3 px-1" : "text-white flex gap-2 items-center md:px-3 px-1"}`} href="/dashboard"><FaUserGroup size={20} />Users</Link>
          </motion.li>
          <motion.li variants={liVariant}>
            <Link className={`${pathname === "/dashboard/addNewWig" ? "bg-white text-[#7F6000] rounded-md flex gap-2 items-center md:px-3 px-1" : "text-white flex gap-2 items-center md:px-3 px-1"}`} href="/dashboard/addNewWig"><MdOutlineViewList size={20} />Add New Wigs</Link>
          </motion.li>
          <motion.li variants={liVariant}>
            <Link className={`${pathname === "/dashboard/addNewBundle" ? "bg-white text-[#7F6000] rounded-md flex gap-2 items-center md:px-3 px-1" : "text-white flex gap-2 items-center md:px-3 px-1"}`} href="/dashboard/addNewBundle"><MdDashboard size={20} />Add New Bundles</Link>
          </motion.li>
          <motion.li variants={liVariant}>
            <Link className={`${pathname === "/dashboard/actions" ? "bg-white text-[#7F6000] rounded-md flex gap-2 items-center md:px-3 px-1" : "text-white flex gap-2 items-center md:px-3 px-1"}`} href="/dashboard/actions"><FaLink size={20} />Edit</Link>
          </motion.li>
        </motion.ul>
      </motion.div>
    </>
  )
}

export default DashboardLinks