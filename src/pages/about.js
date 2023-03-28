import React from "react";
import Meta from "components/Meta";
import Link from "next/link";
// import ContactSection from "components/ContactSection";

function AboutPage(props) {
  return (
    <>
      <Meta title="About" description="Learn about our company and team" />
      <section className="bg-red-100 h-[100vh]">
        <div className="py-12 text-center px-4 container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Our About Page</h1>
          <p className="text-lg mb-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
            consequatur numquam aliquam tenetur ad amet inventore hic beatae,
            quas accusantium perferendis sapiente explicabo, corporis totam!
          </p>
          <Link href="/">
            <a className="underline text-blue-600">Home</a>
          </Link>
        </div>
        {/* <ContactSection /> */}
      </section>
    </>
  );
}

export default AboutPage;
