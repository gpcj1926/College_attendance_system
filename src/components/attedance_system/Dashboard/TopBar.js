import Link from "next/link";
import React from "react";
import {HiOutlineMoon , HiOutlineBars3CenterLeft} from "react-icons/hi2";
import { FiSettings } from "react-icons/fi";
export default function TopBar({
  setSidebarOpen,
}) {
  return (
    <>
      <div className="bg-white fixed top-0 flex  md:justify-end justify-between items-center w-full drop-shadow-xl z-30">
        <button
          type="button"
          className="mx-6 my-4rounded-md text-gray-500 hover:text-gray-900 md:hidden block"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <HiOutlineBars3CenterLeft className=" text-[#a02d29] text-2xl" />
        </button>
        <div className="md:hidden block text-2xl font-bold text-[#a02d29]" >GPCJ</div>
        <div className="flex items-center mx-5 my-4">
        <HiOutlineMoon className="ml-3 text-[#a02d29] text-2xl cursor-pointer" />
        <Link href="/settings/general">
        <FiSettings className="ml-3 text-[#a02d29] text-2xl cursor-pointer" />
        </Link>
        </div>
      </div>
    </>
  );
}
// bg-[#a02d29] hover:bg-[#ad5350] 