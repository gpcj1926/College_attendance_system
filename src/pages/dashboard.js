import React, { Fragment, useEffect } from "react";
import Meta from "components/Meta";
import { requireAuth, useAuth } from "util/auth";
import Index from "components/attedance_system/Dashboard/Index";
import StudentsAnalytics from "components/attedance_system/Dashboard/Dashboard/AdminTabs/Students/StudentsAnalytics";
import { useAllUsers, useUser } from "util/db";
import { Tab } from "@headlessui/react";
import TeachersItem from "components/attedance_system/Dashboard/Dashboard/AdminTabs/Teachers/TeachersItem";
import AssignedClasses from "./../components/attedance_system/Dashboard/Dashboard/TeacherTabs/AssignedClasses/AssignedClasses"
import ClassesAttendance from "./../components/attedance_system/Dashboard/Dashboard/TeacherTabs/Attendance/ClassesAttendance"
import { useRouter } from "next/router";
import NotApproved from "components/attedance_system/common/NotApproved"
const dashboard = () => {
  const auth = useAuth();
  const { data: userData } = useUser(auth?.user?.id);
  // console.log(auth.user)
  const { data: allUsers, refetch: refetchUsers } = useAllUsers();
  const sortedUsers = allUsers?.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const notApprovedDepartAdmin = sortedUsers?.filter((i) => {
    return i.roleas === "department_admin" && i.status === "Not Approved";
  });


  const notApprovedTeachers = sortedUsers?.filter((i) => {
    return i.roleas === "teacher" && i.status === "Not Approved";
  });

  const approvedTeachers = sortedUsers?.filter((i) => {
    return i.roleas === "teacher" && i.status !== "Not Approved";
  });
  const approvedDepartAdmin = sortedUsers?.filter((i) => {
    return i.roleas === "department_admin" && i.status !== "Not Approved";
  });



  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const super_admin_tabs = [
    {
      name: "Students",
    },
    {
      name: "Staff",
    },
    {
      name: "Requests",
    },
  ];
  const Tabs = [
    {
      name: "Classes",
    },
    {
      name: "Attendance",
    }
  ];
  return (
    <Index>
      {userData?.status === "Not Approved" ?
        <NotApproved title={"still not approved"} />
        :
        <section className="red-primary h-screen">
          <Meta title="Dashboard" />
          {["super_admin"].includes(userData?.roleas) && (
            <div className=" mx-auto red-primary pt-10 sm:px-0 ">
              <Tab.Group>
                <Tab.List className=" w-[95%] md:w-[60%] drop-shadow-lg select-none isolate flex divide-x divide-gray-200 dark:divide-gray-600 rounded-lg shadow mx-auto">
                  {super_admin_tabs.map((i) => {
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
                    <StudentsAnalytics />
                  </Tab.Panel>
                  <Tab.Panel>
                    <TeachersItem
                      data={approvedTeachers}
                      refetchUsers={refetchUsers}
                      dataType={"All Teachers"}
                    />
                    <TeachersItem
                      data={approvedDepartAdmin}
                      refetchUsers={refetchUsers}
                      dataType={"Department Admins"}
                    />
                  </Tab.Panel>
                  <Tab.Panel className="h-screen">
                    <TeachersItem
                      data={notApprovedTeachers}
                      refetchUsers={refetchUsers}
                      dataType={"Teacher Requests"}
                    />
                    <TeachersItem
                      data={notApprovedDepartAdmin}
                      refetchUsers={refetchUsers}
                      dataType={"Department Admin Requests"}
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          )}
          {!["super_admin"].includes(userData?.roleas) && (
            <div className=" mx-auto red-primary pt-10 sm:px-0 ">
              <Tab.Group>
                <Tab.List className=" w-[95%] md:w-[60%] drop-shadow-lg select-none isolate flex divide-x divide-gray-200 dark:divide-gray-600 rounded-lg shadow mx-auto">
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
                    <AssignedClasses />
                  </Tab.Panel>
                  <Tab.Panel className="h-screen">
                    <ClassesAttendance />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          )}
        </section>
      }
    </Index>
  );
};

export default requireAuth(dashboard);
