import React from "react";
import Meta from "components/Meta";
import { useAuth } from "util/auth";
import NavbarCarousal from "components/attedance_system/LandingPage/NavbarCarousal";
import Footer from "components/attedance_system/LandingPage/Footer";
import LandingBody from "components/attedance_system/LandingPage/LandingBody";
// import NewsletterSection from "components/NewsletterSection";


function IndexPage(props) {
  const auth = useAuth();
  return (
    <>
        <Meta title="GPCJ" description="Government PostGraduate College Jhang" />
        <NavbarCarousal/>
        <LandingBody/>
        <Footer/>

      {/* <NewsletterSection /> */}
    </>
  );
}

export default IndexPage;
