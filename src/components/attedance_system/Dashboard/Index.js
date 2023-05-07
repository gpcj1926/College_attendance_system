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
    icon: HiOutlineSquares2X2,
  },
  {
    name: "Mark Attendance",
    href: "/markattendance",
    icon: FaUserCog,
  },
  {
    name: "Manage Students",
    icon: FaUserGraduate,
    haveSub: true,
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

          {/* ----------TopBar-------------- */}

          {/* ----------Random Components-------------- */}
          {/* <div className="flex flex-1 flex-col md:pl-64 "> */}
          <div className="">
              <div className="mt-14 h-full">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Index;