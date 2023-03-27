import React, { useState } from "react";
import TopBar from "./TopBar";
import SideBarDesktop from "./SideBarDesktop";
import SideBarMobile from "./SideBarMobile";
import { useAuth } from "util/auth";
import {
  HiOutlineUserPlus,
  HiOutlineUserGroup,
  HiOutlineSquares2X2,
  HiOutlineCog8Tooth,
  HiOutlineListBullet,
} from "react-icons/hi2";
import {
  // FaAddressCard,
  // FaEnvelope,
  // FaPhoneAlt,
  // FaChevronDown,
  // FaRegTrashAlt,
  // FaRegEdit,
  FaUserGraduate,
  // FaShieldAlt,
  // FaCalendarCheck,
  // FaHome,
  // FaUserCog,
  // FaUserTie,
} from "react-icons/fa";
const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HiOutlineSquares2X2,
  },

  {
    name: "Manage Students",
    href: "/allstudents",
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
    name: "About",
    href: "/about",
    icon: HiOutlineListBullet,
  },
  // {
  //   name: "Settings",
  //   href: "/settings/general",
  //   icon: HiOutlineCog8Tooth,
  // },
];

export default function Index({ children }) {
  const auth = useAuth();
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
