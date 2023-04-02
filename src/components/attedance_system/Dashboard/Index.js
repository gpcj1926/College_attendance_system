import React, { useState } from "react";
import TopBar from "./TopBar";
import SideBarDesktop from "./SideBarDesktop";
import SideBarMobile from "./SideBarMobile";
import { useAuth } from "util/auth";
import {
  HiOutlineUserPlus,
  HiOutlineUserGroup,
  HiOutlineSquares2X2,
  // HiOutlineCog8Tooth,
  // HiOutlineListBullet,
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
import { FiSettings } from "react-icons/fi";

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
    haveSub: false,
  }
];

export default function Index({ children }) {
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

          {/* Static sidebar for desktop */}
          <SideBarDesktop navigation={navigation} />

          {/* ----------TopBar-------------- */}
          <TopBar setSidebarOpen={setSidebarOpen} />

          {/* ----------Random Components-------------- */}
          <div className="flex flex-1 flex-col md:pl-64 ">
            <main className="flex-1">
              <div className="mt-10 h-full">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
