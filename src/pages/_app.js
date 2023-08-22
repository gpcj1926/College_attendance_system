import React from "react";
import "styles/global.css";
import "util/analytics";
import { AuthProvider } from "util/auth";
import { QueryClientProvider } from "util/db";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider>
      <AuthProvider>
        <>
          <ToastContainer position="bottom-center" autoClose={2000} />
          <Component {...pageProps} />
        </>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
