// , useState
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";
import {HiXMark} from "react-icons/hi2";
export default function SideBarMobile({
  navigation,
  sidebarOpen,
  togglesidebar,
  auth,
}) {
  const router = useRouter();
  const location = router?.asPath;
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 md:hidden"
        onClose={() => togglesidebar()}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Overlay className="relative flex w-full max-w-xs flex-1 flex-col bg-white ">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {/* ----------close button---------- */}
                <div className="absolute top-0 left-3 -mr-4 pt-4">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center"
                    onClick={() => togglesidebar()}
                  >
                    <span className="sr-only">Close sidebar</span><HiXMark className="text-3xl" />
                  </button>
                </div>
              </Transition.Child>
              <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                {/* ----------logo---------- */}
                <div className="flex flex-shrink-0 items-center justify-center px-4">
                  <Link href="/">
                    <a>
                      <img
                        className="h-[120px] block "
                        src="/Images/logo.png"
                        alt="Logo_GPCJ"
                      />
                    </a>
                  </Link>
                </div>
                {/* ----------navicons---------- */}
                <nav className="mt-5 flex-1 space-y-1 px-2 pt-4 border-t-2 ">
                  {navigation.map((item) => (
                    <Link
                      onClick={() => togglesidebar()}
                      key={item.name}
                      href={item.href}
                      >
                      <a
                      className={classNames(
                        location === item.href
                          ? "bg-gray-200  text-black"
                          : " hover:bg-gray-100 text-black  hover:text-black",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}                    
                      >
                        <item.icon
                          className={classNames(
                            location === item.href
                              ? "text-[#a02d29] dark:text-[#ec615b]"
                              : "text-black dark:group-hover:text-white dark:text-white ",
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
              {/* ----------Profile & Name---------- */}
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
                        {auth?.user?.eamil ? auth?.user?.email : "User Name"}
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
                            className="text-right rounded-lg p-2 text-xs font-medium text-white bg-[#a02d29] hover:bg-[#ad5350] "
                          >
                            Sign Out
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Overlay>
          </Transition.Child>
          <div className="w-14 flex-shrink-0">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
