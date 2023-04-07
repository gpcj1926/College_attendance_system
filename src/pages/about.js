import React from "react";
import Meta from "components/Meta";
import Link from "next/link";
import Footer from "components/attedance_system/LandingPage/Footer";
// import ContactSection from "components/ContactSection";

const data = [
  {
    img: "/Images/About/about_1.jpg",
    title: "",
    des: "",
  },
  {
    img: "/Images/About/about_2.jpg",
    title: "",
    des: "",
  },
];

function AboutPage(props) {
  return (
    <>
      <Meta title="About" description="Learn about our company and team" />
      <section className="bg-red-100 h-[100vh]">
        <header class="bg-red-100 text-[#a02d29] py-4 flex flex-col justify-center">
          <h1 class="md:text-5xl sm:text-3xl text-2xl text-center font-bold my-2">
            About Us
          </h1>
          <Link href="/">
            <a className="underline text-blue-600 text-center my-2">Home</a>
          </Link>
        </header>

        <main className="bg-red-100">
          <section className="flex flex-col-reverse lg:flex-row items-center justify-center md:justify-between lg:mx-20 mx-4 py-28 border-b-2 border-gray-400">
            <div className="w-[90%] lg:w-1/2 mx-4">
              <h2 className="md:text-2xl text-xl text-center lg:text-left font-bold mb-4 text-[#a02d29]">
                Government Post Graduate College Jhang
              </h2>
              <p className="text-base text-justify">
                Government Graduate College Jhang is a well-known institution of
                higher education located in the city of Jhang in the Punjab
                province of Pakistan. The college was established in 1926 and
                now get affiliated with Gc University Faislabad. Initially, the
                college was just offering intermediate education in a rented
                building in the heart of the city. But now it has expanded
                significantly and now offers a wide range of undergraduate and
                postgraduate programs in various fields of study, including
                arts, science, commerce, and computer science.
              </p>
            </div>
            <div className="mx-4 lg:my-0 my-5 ">
              <img
                src={"./Images/slider-1.jpg"}
                alt="Team Member"
                className="w-full lg:w-[500px] lg:mx-auto rounded-lg shadow-md"
              />
            </div>
          </section>

          <h2 className="mt-10 md:text-4xl sm:text-3xl text-2xl text-center font-bold text-[#a02d29]">
            Our Alumni
          </h2>

          <section className="flex flex-col lg:flex-row items-center justify-center md:justify-evenly  lg:mx-20 mx-4 py-28 border-b-2 border-gray-400">
            {/* Image */}
            <div className="lg:ml-[110px]">
              <img
                src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt="Office"
                className="md:w-[300px] md:h-[300px] w-[200px] h-[200px] object-cover lg:mx-auto rounded-full shadow-md lg:mb-0 mb-3"
              />
            </div>
            {/* Text */}
            <div className="w-full lg:w-1/2 mx-4">
              <h2 className="md:text-2xl text-xl text-center lg:text-left font-bold mb-4 text-[#a02d29]">
                Sardar Muhammad Yousuf
              </h2>
              <p className="text-base mb-4 text-justify">
                Sardar Muhammad Yousuf is a prominent Pakistani politician who
                is a member of the National Assembly of Pakistan. He graduated
                from Government Graduate College Jhang and went on to study law
                at the University of the Punjab. He has served as a member of
                the Punjab Assembly as well as a federal minister.
              </p>
            </div>
          </section>
        </main>
        <Footer/>
        {/* <ContactSection /> */}
      </section>
    </>
  );
}

export default AboutPage;
