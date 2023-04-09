import React from "react";
import Meta from "components/Meta";
import Link from "next/link";
import Footer from "components/attedance_system/LandingPage/Footer";
// import ContactSection from "components/ContactSection";

const AluminiData = [
  {
    img: "/Images/About/about_1.jpg",
    title: "Abdus Salam",
    des: "Mohammad Abdus Salam (29 January 1926 – 21 November 1996) was a Pakistani theoretical physicist and a Nobel Prize laureate. He shared the 1979 Nobel Prize in Physics with Sheldon Glashow and Steven Weinberg for his contribution to the electroweak unification theory. He was the first Pakistani and the first Muslim from an Islamic country to receive a Nobel Prize in science.",
  },
  {
    img: "/Images/About/about_2.jpg",
    title: "Har Gobind Khorana",
    des: "Har Gobind Khorana (9 January 1922 – 9 November 2011) was an Indian American biochemist. While on the faculty of the University of Wisconsin–Madison, Born in British India, Khorana served on the faculties of three universities in North America. He became a naturalized citizen of the United States in 1966, and received the National Medal of Science in 1987.",
  },
  {
    img: "/Images/About/about_3.jpg",
    title: "Majeed Amjad",
    des: "Amjad was born on 29 June 1914 in Jhang, a small town in the Pakistani province of Punjab. He was taught by his maternal grandfather. Then for a few years he studied Arabic and Persian under the supervision of his maternal grandfather Noor Muhammad at a local mosque before enrolling in first grade in a government school. He obtained his Matriculation certificate in the first division from Islamia High School, Jhang. Two years later he completed his Intermediate exam, also in the first division from Government College, Jhang. Later he moved to Lahore for higher education that was not available in Jhang.",
  },
  {
    img: "/Images/About/about_4.jpg",
    title: "Mahmood Shaam",
    des: "Mahmood Shaam, born Tariq Mahmood on 5 February 1940, is a Pakistani Urdu language journalist, poet, writer, and news analyst. After serving Pakistan's largest newspaper Jang Group for more than 16 years continuously as Group Editor, he joined ARY Digital Group on 21 September 2010 to launch a new Urdu language newspaper. He has written many books on different subjects. Mahmood Shaam received his bachelor's degree in English literature, Persian and Philosophy from Government College Jhang in 1962.",
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
          <section className="flex flex-col-reverse lg:flex-row items-center justify-center md:justify-between lg:mx-20 mx-4 pb-28 pt-10 border-b-2 border-gray-400">
            <div className="w-[90%] lg:w-1/2 mx-4">
              <h2 className="md:text-3xl text-2xl text-center lg:text-left font-bold mb-4 text-[#a02d29]">
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
                className="w-full lg:w-[500px] md:h-[250px] h-[190px] object-cover lg:mx-auto rounded-lg shadow-md"
              />
            </div>
          </section>

          <h2 className="mt-10 md:text-4xl sm:text-3xl text-2xl text-center font-bold text-[#a02d29]">
            Our Alumni
          </h2>
          {AluminiData.map((i, index) => {
            return (
              <section key={index} className="flex flex-col lg:flex-row items-center justify-center md:justify-evenly  lg:mx-20 mx-4 py-16 md:py-28 border-b-2 border-gray-400">
                {/* Image */}
                <div className="lg:ml-[110px]">
                  <img
                    src={i.img}
                    alt="Alumni"
                    className="md:w-[300px] md:h-[300px] w-[200px] h-[200px] object-cover lg:mx-auto rounded-full shadow-md lg:mb-0 mb-3"
                  />
                </div>
                {/* Text */}
                <div className="w-full lg:w-1/2 px-10">
                  <h2 className="md:text-2xl text-xl text-center lg:text-left font-bold mb-4 text-[#a02d29]">
                    {i.title}
                  </h2>
                  <p className="text-base mb-4 text-justify">{i.des}</p>
                </div>
              </section>
            );
          })}
        </main>
        <Footer />
        {/* <ContactSection /> */}
      </section>
    </>
  );
}

export default AboutPage;
