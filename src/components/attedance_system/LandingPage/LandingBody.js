import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Link from "next/link";
import { useAuth } from "util/auth";
const LandingBody = () => {
  const data = [
    {
      title: "block-1",
      src: "/Images/slider-1.jpg",
      description:
        "Mission to raise the productivity of our graduates through quality education and practical knowledge to contribute in a significant way to the national economy.",
      person: "M Kashif Bilal",
      date: "July 12",
    },
    {
      title: "block-2",
      src: "/Images/slider-2.jpg",
      description:
        "Mission to raise the productivity of our graduates through quality education and practical knowledge to contribute in a significant way to the national economy.",
      person: "M Adeel",
      date: "Nov 10",
    },
    {
      title: "block-3",
      src: "/Images/slider-3.jpg",
      description:
        "Mission to raise the productivity of our graduates through quality education and practical knowledge to contribute in a significant way to the national economy.",
      person: "Hanzlah Ashraf",
      date: "Jun 4",
    },
    {
      title: "block-4",
      src: "Images/slider-4.jpg",
      description:
        "Mission to raise the productivity of our graduates through quality education and practical knowledge to contribute in a significant way to the national economy.",
      person: "Asif Bilal",
      date: "Dec 23",
    },
  ];
  const auth = useAuth();
  return (
    <>
      <section>
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
              <div className="flex items-center mt-4">
                <Link href="/about">
                  <button className="flex rounded-full bg-red-700 hover:bg-red-600 py-2 px-4 font-semibold text-white shadow-sm ">
                    About Us
                  </button>
                </Link>
                {auth?.user ? (
                  <Link href="/dashboard">
                    <button
                      className="text-white hover:bg-red-600 bg-red-700 font-semibold py-2 px-4 rounded-full ml-2"
                    >
                      Dashboard
                    </button>
                  </Link>
                ) : (
                  <Link href="/auth/signin">
                    <button className="text-white hover:bg-red-600 bg-red-700 font-semibold py-2 px-4 rounded-full ml-2">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </section>
        </main>
      </section>
      <h2 className="text-lg text-red-500 underline text-center mt-6">
        *Under Development*
      </h2>
      <h2 className="text-sm text-red-500 underline text-center mt-2">
        kashif & Adeel
      </h2>

      <div className="m-4 flex flex-wrap justify-center mx-auto">
        {data.map((item) => {
          return (
            <div key={item.title} className="max-w-sm lg:max-w-md lg:flex m-6">
              <div
                className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                style={{ backgroundImage: `url(${item.src})` }}
                title="Woman holding a mug"
              ></div>
              <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                  <div className="text-gray-900 font-bold text-xl mb-2">
                    {item.title}
                  </div>
                  <p className="text-gray-700 text-base">{item.description}</p>
                </div>
                <div className="flex items-center">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
                    alt="Avatar of Jonathan Reinink"
                  />
                  <div className="text-sm">
                    <p className="text-gray-900 leading-none">{item.person}</p>
                    <p className="text-gray-600"> {item.date}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LandingBody;
