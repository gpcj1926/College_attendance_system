import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { getUser } from "util/db";
import { useEffect } from "react";

function SideBarDesktop({ navigation, auth }) {
  
  const router = useRouter();
  const location = router?.asPath;

  const [data, setData] = useState(null);
  const user = auth?.user?.uid;
  const query = getUser(user);
  query.then(result => {
    setData({
       email: result.email ,
       name: result.name ,
       roleas: result.roleas 
  });
});
  return (
    <div
      className=" hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col 
    drop-shadow-xl z-40"
    >
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex min-h-0 flex-1 flex-col bg-white ">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center justify-center">
            <Link href="/">
              <a>
                <img
                  className=" h-[130px] block text"
                  src="/Images/logo.png"
                  alt="Logo_GPCJ"
                />
              </a>
            </Link>
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-2 pt-2  ">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                >
                <a
                className={classNames(
                  location === item.href
                    ? "bg-gray-200  text-black"
                    : " hover:bg-gray-50 text-black  hover:text-black",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
                >
                  <item.icon
                    className={classNames(
                      location === item.href
                        ? "text-[#a02d29]"
                        : "text-gray-400 ",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              </Link>
            ))}
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
                  {data?.name ? data?.name : "User Name"}
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
