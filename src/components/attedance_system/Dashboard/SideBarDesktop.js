import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useUser } from "util/db";
import { useAuth } from "util/auth";
import { Disclosure } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
function SideBarDesktop({ navigation }) {
  const router = useRouter();
  const location = router?.asPath;

  const auth = useAuth();
  const { data: userData } = useUser(auth?.user?.id);
  // console.log(userData , "userData")

  return (
    <div
      className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col 
    drop-shadow-xl z-40"
    >
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex min-h-0 flex-1 flex-col bg-white ">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <Link href="/">
            <div className="flex items-center flex-shrink-0 cursor-pointer justify-center">
              <img src={"/Images/logo.png"} alt="Logo" className="h-16 mr-4" />
              <h2 className="text-red-800 text-4xl font-semibold mr-4">GPCJ</h2>
            </div>
          </Link>
          <nav className="mt-5 flex-1 space-y-1 px-2 pt-2  ">
            {navigation.map((item) => {
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
                          ? "bg-red-100   text-black"
                          : " hover:bg-gray-50 text-black  hover:text-black",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          location === item.href
                            ? "text-[#a02d29]"
                            : "text-gray-400 ",
                          "mr-3 flex-shrink-0 h-5 w-5"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                ) : (
                  <Disclosure
                    key={item.name}
                    defaultOpen={
                      item.sub.filter((i) => {
                        return i.href === location;
                      })?.length !== 0
                        ? true
                        : false
                    }
                  >
                    <div
                      className={classNames(
                        item.sub.filter((i) => {
                          return i.href === location;
                        })?.length !== 0
                          ? "bg-red-100  text-black"
                          : " hover:bg-gray-50 text-black  hover:text-black",
                        "group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={classNames(
                            item.sub.filter((i) => {
                              return i.href === location;
                            })?.length !== 0
                              ? "text-[#a02d29]"
                              : "text-gray-400 ",
                            "mr-3 flex-shrink-0 h-5 w-5"
                          )}
                          aria-hidden="true"
                        />
                        <div className="cursor-default">{item.name}</div>
                      </div>
                      <Disclosure.Button>
                        <FaChevronDown className="text-sm" />
                      </Disclosure.Button>
                    </div>

                    <Disclosure.Panel>
                      <div className="ml-3">
                        {item.sub.map((sub) => {
                          return (
                            <Link key={sub.name} href={sub.href}>
                              <a
                                className={classNames(
                                  location === sub.href
                                    ? "bg-red-100   text-black"
                                    : " hover:bg-gray-50 text-black  hover:text-black",
                                  "group flex items-center px-2 py-2 text-xs font-medium rounded-md"
                                )}
                              >
                                <sub.icon
                                  className={classNames(
                                    location === sub.href
                                      ? "text-[#a02d29]"
                                      : "text-gray-400 ",
                                    "mr-3 flex-shrink-0 h-5 w-5"
                                  )}
                                  aria-hidden="true"
                                />
                                {sub.name}
                              </a>
                            </Link>
                          );
                        })}
                      </div>
                    </Disclosure.Panel>
                  </Disclosure>
                );
              }
            })}
          </nav>
        </div>
        <div className="flex flex-shrink-0 bg-white  border-t-2  p-4">
          <div className="group block w-full flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full mr-2"
                    src={
                      auth?.user?.photoURL
                        ? auth.user.photoURL
                        : "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
                    }
                    alt="User_photo"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-sm font-medium text-black ">
                  {userData?.name ? userData?.name : "User Name"}
                </p>
              </div>

              <div className="ml-3">
                {auth?.user && (
                  <Link href="/">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        auth.signout();
                      }}
                      className="text-right rounded-lg p-2 text-xs font-medium text-white bg-[#a02d29] hover:bg-[#ad5350]  "
                    >
                      Sign Out
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarDesktop;
