import React, { Fragment } from "react";
import Meta from "components/Meta";
import { requireAuth, useAuth } from "util/auth";
import Index from "components/attedance_system/Dashboard/Index";
import Requests from "components/attedance_system/Dashboard/Dashboard/Requests";
import StudentsAnalytics from "components/attedance_system/Dashboard/Dashboard/StudentsAnalytics";
import { useUser } from "util/db";
import { Tab } from "@headlessui/react";
const dashboard = () => {
  const auth = useAuth();
  const { data: userData } = useUser(auth?.user?.id);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const Tabs = [
    {
      name: "Students",
    },
    {
      name: "Teachers",
    },
    {
      name: "Requests",
    },
  ];
  return (
    <Index>
      <section className="bg-red-100 h-screen">
        <Meta title="Dashboard" />
        <div className="w-[90%] px-2 mx-auto pt-10 sm:px-0 ">
          <Tab.Group>
          <Tab.List className="drop-shadow-lg select-none isolate flex divide-x divide-gray-200 dark:divide-gray-600 rounded-lg shadow">
              {Tabs.map((i) => {
                return (
                  <Tab as={Fragment} key={i.name}>
                    {({ selected }) => (
                      <span
                        className={classNames(
                          selected
                            ? "text-gray-900 bg-gray-50"
                            : "text-gray-500 hover:text-gray-700",
                          "group relative min-w-0 flex-1 overflow-hidden dark:bg-[#262525] dark:text-white bg-white py-4  text-sm font-medium text-center hover:bg-gray-50 focus:z-10 cursor-pointer"
                        )}
                      >
                        <button>{i.name}</button>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            selected
                              ? "bg-red-500 dark:bg-[#ec615b] "
                              : "bg-transparent",
                            "absolute inset-x-0 bottom-0 h-1"
                          )}
                        />
                      </span>
                    )}
                  </Tab>
                );
              })}
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel>
        {["super_admin"].includes(userData?.roleas) && <StudentsAnalytics />}

              </Tab.Panel>
              <Tab.Panel>
                <h2>Comming Soon</h2>
              </Tab.Panel>
              <Tab.Panel>
        {["super_admin"].includes(userData?.roleas) && <Requests />}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </Index>
  );
};

export default requireAuth(dashboard);
