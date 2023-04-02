import React from "react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FiMoon , FiAlignRight} from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useAuth } from "util/auth";

const NavbarCarousal = () => {
  const auth = useAuth();
  return (
    <>
      <section className="relative">
        <nav className="fixed top-0 flex justify-between items-center w-full bg-red-50 bg-opacity-75 backdrop-filter backdrop-blur-lg z-50 p-3">
          <div className="flex items-center flex-shrink-0">
            <img src={"./Images/logo.png"} alt="Logo" className="h-12 mr-4" />
            <h2 className="text-red-800 text-4xl font-semibold">GPCJ</h2>
          </div>

          <div className="flex items-center">
            <div className="hidden md:block mr-6">
              <ul className="flex space-x-4 font-semibold">
                <li>
                  <a href="#" className="text-red-800 text-lg duration-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-red-800 text-lg duration-200">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-red-800 text-lg duration-200">
                    Departments
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                {
                  auth?.user ? 
                  <Link href="/dashboard">
                  <button className="text-white hover:bg-red-600 bg-red-700 font-bold py-2 px-4 rounded-full ml-2">
                    Dashboard
                  </button>
                  </Link>
                  :
                <Link href="/auth/signin">
                <button className="text-white hover:bg-red-600 bg-red-700 font-bold py-2 px-4 rounded-full ml-2">
                  Sign In
                </button>
                </Link>

                }
                <div className="hidden md:block text-red-6700 p-1 rounded-full">
                  <FiMoon className="text-3xl ml-2 text-red-700 cursor-pointer" />
                </div>
                <div className="block md:hidden text-red-6700 p-1 rounded-full">
                  <FiAlignRight className="text-4xl ml-2 text-red-700 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="relative flex-grow flex items-center justify-center">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="swiper-container"
          >
            <SwiperSlide>
              <img
                className="object-cover w-full h-screen"
                src="/Images/demo.jpg"
                alt="image slide 1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="object-cover w-full h-screen"
                src="/Images/demo.jpg"
                alt="image slide 2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="object-cover w-full h-screen"
                src="/Images/demo.jpg"
                alt="image slide 3"
              />
            </SwiperSlide>
          </Swiper>
          <section className="bg-black bg-opacity-50 absolute bottom-0 right-0 p-6 w-full z-40">
            <div>
              <h1 className="text-2xl sm:text-4xl text-left font-bold mt-2 text-white shadow-2xl">
                Government Post Graduate College Jhang
              </h1>
              <p className="md:w-2/4 w-full mt-3 text-white">
                Mission to raise the productivity of our graduates through
                quality education and practical knowledge to contribute in a
                significant way to the national economy.
              </p>

              <Link href="/about">
                <button className="flex mt-4 rounded-full bg-red-700 hover:bg-red-600 py-2 px-4 text-lg font-semibold text-white shadow-sm ">
                  About Us
                </button>
              </Link>
            </div>
          </section>
        </main>
      </section>
    </>
  );
};

export default NavbarCarousal;
