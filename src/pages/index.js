import React from "react";
import Meta from "components/Meta";
// import NewsletterSection from "components/NewsletterSection";
import { useAuth } from "util/auth";
import Link from "next/link";
function IndexPage(props) {
  const auth = useAuth();
  console.log(auth.user);
  return (
    <>
      <Meta />
      <section className="py-12 px-4">
        <div>
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-[130px] block"
              src="/Images/logo.png"
              alt="Logo_GPCJ"
            />
            <h1 className="text-5xl text-center font-bold mt-6">
              Government Post Graduate College Jhang
            </h1>
          </div>
          <Link href="/dashboard">
            <button className="flex mt-6 mx-auto rounded-md bg-[#a02d29] hover:bg-[#a74d4a] py-2 px-3 text-lg font-semibold text-white shadow-sm ">
              Get Started
            </button>
          </Link>
        </div>
      </section>
      {/* <NewsletterSection /> */}
    </>
  );
}

export default IndexPage;
