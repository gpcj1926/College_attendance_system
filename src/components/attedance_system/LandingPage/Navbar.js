import React from "react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FiMoon } from "react-icons/fi";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "util/auth";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { useUser } from "util/db";
import classNames from "classnames";
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/router";

const Navbar = ({ setSidebarOpen, navigation }) => {
  const auth = useAuth();
  const { data: userData } = useUser(auth?.user?.id);
  const router = useRouter();
  const location = router?.asPath;
  return (
    <>
      <section className="relative">
        <nav className="fixed top-0 flex justify-between items-center w-full bg-red-50 bg-opacity-75 backdrop-filter backdrop-blur-lg z-[800] p-3 shadow-md">
          <button
            type="button"
            className=" rounded-md text-gray-500 hover:text-gray-900 md:hidden block"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <HiOutlineBars3CenterLeft className=" text-red-700 text-4xl" />
          </button>
          {/* Logo/GPCJ */}
          <div>
            <Link href="/">
              <div className=" hidden items-center flex-shrink-0 cursor-pointer md:flex">
                <img
                  src={"/Images/logo.png"}
                  alt="Logo"
                  className="h-12 mr-4"
                />
                <h2 className="text-red-700 text-4xl font-semibold">GPCJ</h2>
              </div>
            </Link>
            <Link href="/">
              <div className="flex items-center cursor-pointer md:hidden">
                <img
                  src={"/Images/logo.png"}
                  alt="Logo"
                  className="h-12 ml-8"
                />
              </div>
            </Link>
          </div>

          <div className="flex items-center">
            {/* navbar */}
            {auth?.user?.uid ? (
              <div className="hidden md:block mr-3">
                <nav className="flex px-2">
                  {navigation?.map((item) => {
                    if (
                      item.name === "Manage Students" &&
                      userData?.roleas !== "super_admin"
                    ) {
                      return "";
                    } else {
                      return !item.haveSub ? (
                        <Link key={item.name} href={item.href}>
                          <a
                            className={classNames(
                              location === item.href
                                ? "text-red-700"
                                : "  text-black  hover:text-gray-600",
                              "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                location === item.href
                                  ? "text-red-700"
                                  : "text-gray-400 ",
                                "mr-2 flex-shrink-0 h-4 w-4"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </Link>
                      ) : (
                        <div key={item.name} className="relative group">
                          <div
                            className={classNames(
                              item.sub.filter((i) => {
                                return i.href === location;
                              })?.length !== 0
                                ? "text-red-700"
                                : "  text-black  hover:text-gray-600",
                              "group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md"
                            )}
                          >
                            <div className="flex items-center">
                              <item.icon
                                className={classNames(
                                  item.sub.filter((i) => {
                                    return i.href === location;
                                  })?.length !== 0
                                    ? "text-red-700"
                                    : "text-gray-400 ",
                                  "mr-2 flex-shrink-0 h-4 w-4"
                                )}
                                aria-hidden="true"
                              />
                              <div className="cursor-pointer">{item.name}</div>
                            </div>
                            <FaChevronDown className="text-xs ml-2" />
                          </div>

                          <div className=" bg-white absolute left-7 top-8 hidden group-hover:block shadow-xl ">
                            {item.sub.map((sub) => {
                              return (
                                <div className="py-3 pl-3 pr-5 border-b-2 hover:bg-red-50 hover:text-red-700">
                                  <Link key={sub.name} href={sub.href}>
                                    <a
                                      className={classNames(
                                        location === sub.href
                                          ? "text-red-700"
                                          : " text-black  hover:text-gray-600",
                                        "group flex items-center text-sm font-medium"
                                      )}
                                    >
                                      <sub.icon
                                        className={classNames(
                                          location === sub.href
                                            ? "text-red-700"
                                            : "text-gray-400 ",
                                          "mr-2 flex-shrink-0 h-4 w-4"
                                        )}
                                        aria-hidden="true"
                                      />
                                      {sub.name}
                                    </a>
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                  })}
                </nav>
              </div>
            ) : (
              ""
            )}

            <div className="flex items-center">
              {/* admin/teacher */}
              <div className="mr-3">
                {userData ? (
                  userData?.roleas !== "super_admin" ? (
                    userData?.status === "Approved" ? (
                      <h2 className="bg-green-600 p-2 text-xs text-white rounded-full ">
                        {userData?.status}
                      </h2>
                    ) : (
                      <h2 className="bg-red-600 p-2 text-xs text-white rounded-full ">
                        {userData?.status}
                      </h2>
                    )
                  ) : (
                    <h2 className="bg-green-600 p-2 text-xs text-white rounded-full ">
                      Admin
                    </h2>
                  )
                ) : (
                  ""
                )}
              </div>
              {/* signin / signout */}
              <div className="mr-3 hidden md:block">
                {auth?.user ? (
                  <Link href="/">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        auth.signout();
                      }}
                      className="red-button text-base"
                    >
                      Sign out
                    </button>
                  </Link>
                ) : (
                  <Link href="/auth/signin">
                    <button className="red-button text-base">
                      Sign in
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
