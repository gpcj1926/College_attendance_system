import React from "react";
import Meta from "components/Meta";
import ContactSection from "components/ContactSection";
import Index from "components/attedance_system/Dashboard/Index";
import { requireAuth } from "util/auth";

function AboutPage(props) {
  return (
    <>
      <Index>

        <Meta title="About" description="Learn about our company and team" />
        <section className="bg-red-100 h-[100vh]">
          <div className="py-12 px-4 container mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
            consequatur numquam aliquam tenetur ad amet inventore hic beatae, quas
            accusantium perferendis sapiente explicabo, corporis totam!
          </div>
        <ContactSection />
        </section>
      </Index>
    </>
  );
}

export default requireAuth(AboutPage);
