import React from "react";
import { useRouter } from "next/router";
import Meta from "components/Meta";
import AuthSection from "components/AuthSection";
import Index from "components/attedance_system/Dashboard/Index";

function AuthPage(props) {
  const router = useRouter();

  return (
    <>
      <Index>
      <Meta title="Auth" />
      <AuthSection
        type={router.query.type}
        providers={["google", "facebook", "twitter"]}
        afterAuthPath={router.query.next || "/dashboard"}
        />
        </Index>
    </>
  );
}

// Tell Next.js to export static files for each page
// See https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths = () => ({
  paths: [
    { params: { type: "signin" } },
    { params: { type: "signup" } },
    { params: { type: "forgotpass" } },
    { params: { type: "changepass" } },
  ],
  fallback: true,
});

export function getStaticProps({ params }) {
  return { props: {} };
}

export default AuthPage;
