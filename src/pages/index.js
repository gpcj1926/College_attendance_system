import React from "react";
import Meta from "components/Meta";
import NewsletterSection from "components/NewsletterSection";
import { useAuth } from "util/auth";
import Link from "next/link";
function IndexPage(props) {
  const auth = useAuth();
  console.log(auth.user)
  return (
    <>
      <Meta />
      <section className="py-12 px-4">
        <div className="container mx-auto">
          This is a placeholder template, blah, blah.
        </div>
        <div>
          <Link href="/dashboard">
          getstarted
          </Link>
        </div>
      </section>
      {/* <NewsletterSection /> */}
    </>
  );
}

export default IndexPage;
