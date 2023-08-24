import React, { useState } from "react";
import SideBarMobile from "./SideBarMobile";
import { requireAuth } from "util/auth";
import {
  HiOutlineUserPlus,
  HiOutlineUserGroup,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import {
  // FaAddressCard,
  // FaEnvelope,
  // FaPhoneAlt,
  // FaChevronDown,
  // FaRegTrashAlt,
  // FaRegEdit,
  // FaShieldAlt,
  // FaCalendarCheck,
  // FaHome,
  // FaUserTie,
  FaUserGraduate,
  FaUserCog,
} from "react-icons/fa";
import { RiLockPasswordLine, RiSettings2Line } from 'react-icons/ri';
import { FiSettings } from "react-icons/fi";
import Navbar from "../LandingPage/Navbar";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    allow: ['super_admin', 'teacher', 'department_admin'],
    icon: HiOutlineSquares2X2,
  },
  {
    name: "Classes",
    href: "/classes",
    allow: ['super_admin', 'department_admin'],
    icon: HiOutlineSquares2X2,
  },
  {
    name: "Manage Students",
    icon: FaUserGraduate,
    haveSub: true,
    allow: ['super_admin'],
    sub: [
      {
        name: "All Students",
        href: "/allstudents",
        icon: HiOutlineUserGroup
      },
      {
        name: "Add Student",
        href: "/addstudent",
        icon: HiOutlineUserPlus,
      },
    ],
  },
  {
    name: "Settings",
    href: "/settings/general",
    icon: FiSettings,
    allow: ['super_admin', 'teacher', 'department_admin'],
    haveSub: true,
    sub: [
      {
        name: "General",
        href: "/settings/general",
        icon: RiSettings2Line
      },
      {
        name: "Password",
        href: "/settings/password",
        icon: RiLockPasswordLine,
      },
    ],
  }
];

function Index({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const togglesidebar = () => setSidebarOpen((oldState) => !oldState);

  return (
    <>
      <div>
        <div className=" h-[100vh]">
          {/* Static sidebar for mobile */}
          <SideBarMobile
            navigation={navigation}
            sidebarOpen={sidebarOpen}
            togglesidebar={togglesidebar}
          />

          {/* Static topBar for desktop */}
          <Navbar navigation={navigation} setSidebarOpen={setSidebarOpen} />

          {/* ----------Random Components-------------- */}
          {/* <div className="flex flex-1 flex-col md:pl-64 "> */}
          <div className="">
            <div className="mt-14 min-h-screen">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Index;