"use client";
import Link from "next/link";
import { GrTechnology } from "react-icons/gr";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { Routes } from "@/app/constants/enums";
import { useState } from 'react';

const Navbar = () => {
    const [toggle, setToggle] = useState(false);

  return (
    <div className="flex items-center gap-8">
      <Link href={Routes.ROOT} className="flex items-center text-2xl font-bold text-purple-700">
        CLOUD <GrTechnology className="text-yellow-400 " /> HOSTING
      </Link>
      <ul className="hidden md:flex items-center space-x-6 ms-10">
        <li><Link href={Routes.ROOT} className="text-lg font-semibold text-gray-800 hover:text-blue-800">Home</Link></li>
        <li><Link href={Routes.ARTICLES} className="text-lg font-semibold text-gray-800 hover:text-blue-800">Articles</Link></li>
        <li><Link href={Routes.ABOUT} className="text-lg font-semibold text-gray-800 hover:text-blue-800">About</Link></li>
      </ul>
      <div className="text-4xl font-bold text-gray-800 cursor-pointer md:hidden" onClick={() => setToggle(!toggle)}>
        {toggle ? <IoMdClose /> : <AiOutlineMenu />}
      </div>
    </div>
  );
};



export default Navbar;