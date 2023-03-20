import React from "react";
import Link from "next/link";
import { useAuth } from "util/auth";

function Navbar(props) {
  const auth = useAuth();

  return (
    <header className="py-5 px-4 bg-gray-100">
      <div className="container flex flex-col flex-wrap items-center mx-auto md:flex-row">
        <Link href="/">
          <a className="mb-3 md:mb-0">College attendance system</a>
        </Link>
        <nav className="flex flex-wrap items-center md:ml-auto">
          <Link href="/about">
            <a className="ml-5">About</a>
          </Link>
          <Link href="/addstudent">
            <a className="ml-5">Add student</a>
          </Link>
          <Link href="/allstudents">
            <a className="ml-5">All students</a>
          </Link>
          {auth.user && (
            <>
              <Link href="/dashboard">
                <a className="ml-5">Dashboard</a>
              </Link>
              <Link href="/settings/general">
                <a className="ml-5">Settings</a>
              </Link>
              <Link href="/auth/signout">
                <a
                  className="ml-5"
                  onClick={(e) => {
                    e.preventDefault();
                    auth.signout();
                  }}
                >
                  Sign out
                </a>
              </Link>
            </>
          )}

            <Link href="/auth/signin">
              <a className="ml-5 mr-2">Sign in </a>
            </Link>
          {auth.user && ( "present"
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
