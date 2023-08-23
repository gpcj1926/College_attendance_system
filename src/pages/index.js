import React from "react";
import Meta from "components/Meta";
import { useAuth } from "util/auth";
import Navbar from "components/attedance_system/LandingPage/Navbar";
import Footer from "components/attedance_system/LandingPage/Footer";
import LandingBody from "components/attedance_system/LandingPage/LandingBody";
// import NewsletterSection from "components/NewsletterSection";


function IndexPage(props) {
  const auth = useAuth();
  return (
    <>
      <Meta title="GPGCJ" description="Government PostGraduate College Jhang" />
      <Navbar />
      <LandingBody />
      <Footer />

      {/* <NewsletterSection /> */}
    </>
  );
}

export default IndexPage;
