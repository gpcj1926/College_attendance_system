import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Link from "next/link";
import { useAuth } from "util/auth";
const LandingBody = () => {
  const data = [
    {
      title: "Quality Education",
      src: "/Images/slider-1.jpg",
      description: "Our commitment to providing quality education ensures that students receive a comprehensive learning experience that prepares them for the future.",
    },
    {
      title: "Innovative Learning",
      src: "/Images/slider-2.jpg",
      description: "We embrace innovative teaching methods to engage students and foster a passion for learning in a dynamic and ever-changing world.",
    },
    {
      title: "Empowering Students",
      src: "/Images/slider-3.jpg",
      description: "We empower students with knowledge, critical thinking skills, and the confidence to contribute positively to their communities and society at large.",
    },
    {
      title: "Holistic Development",
      src: "/Images/slider-4.jpg",
      description: "Our holistic approach to education focuses not only on academics but also on nurturing well-rounded individuals with strong values and ethics.",
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
                  <button className="flex rounded-full bg-red-800 hover:bg-red-600 py-2 px-4 font-semibold text-white shadow-sm ">
                    About Us
                  </button>
                </Link>
                {auth?.user ? (
                  <Link href="/dashboard">
                    <button
                      className="red-button-rounded"
                    >
                      Dashboard
                    </button>
                  </Link>
                ) : (
                  <Link href="/auth/signin">
                    <button className="red-button-rounded">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </section>
        </main>
      </section>

      <div className="m-4 flex flex-wrap justify-center mx-auto">
        {data.map((item, index) => {
          return (
            <>
              <main className={` lg:px-20 py-32 lg:flex ${!((index + 1) % 2 === 0) ? "lg:felx-row" : "lg:flex-row-reverse"} items-center justify-evenly `}>
                <div className=" lg-p-14 p-8 lg:pt-16 lg:text-left  lg:w-1/2 w-max-1/2 text-center">
                  <h2
                    className="lg:text-5xl text-4xl mb-4 text-[#202226] font-semibold"
                    id="Landing-main"
                  >
                    {item.title}
                  </h2>
                  <p className="text-xl mb-4 text-[#888C8F]  text-nomral font-semibold">
                    {item.description}
                  </p>
                </div>
                <div className="flex">
                  <img
                    className=" w-[400px] mx-auto object-cover"
                    src={item.src}
                    alt="Time managment"
                  />
                </div>
              </main>
              {
                !(data.length === (index + 1)) &&
                <div className="h-[2px] bg-gray-200 w-[80%] mx-auto"></div>
              }
            </>
          );
        })}
      </div>
    </>
  );
};

export default LandingBody;
