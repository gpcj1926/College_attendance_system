import React, { useEffect, useState } from "react";
import AllStudentsItems from "components/attedance_system/Dashboard/Allstudents/AllStudentsItems";
import Loader from "components/attedance_system/common/Loader";
import Index from "components/attedance_system/Dashboard/Index";
import { requireAuth, requireSuperAdmin } from "util/auth";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAllStudents } from "util/db";
import Meta from "components/Meta";

function allstudents() {
  const { register, handleSubmit, errors, reset } = useForm();

  const { data: allStudents, refetch: refetchStudents } = useAllStudents();
  const [allData, setAllData] = useState(allStudents);
  useEffect(() => {
    if (allStudents) {
      setAllData(allStudents);
    }
  }, [allStudents]);
  const submitHandle = async (data) => {
    console.log(data);

    if (data.reg_no) {
      if (data.department && data.shift && data.shift !== "both") {
        setAllData(
          allStudents.filter((i) => {
            return (
              i.department === data.department &&
              i.shift === data.shift &&
              i.registration_no === data.reg_no
            );
          })
        );
      } else if (data.department && !data.shift) {
        setAllData(
          allStudents.filter((i) => {
            return (
              i.department === data.department &&
              i.registration_no === data.reg_no
            );
          })
        );
      } else if (data.shift && !data.department) {
        if (data.shift === "both") {
          setAllData(
            allStudents.filter((i) => {
              return i.registration_no === data.reg_no;
            })
          );
        } else {
          setAllData(
            allStudents.filter((i) => {
              return (
                i.shift === data.shift && i.registration_no === data.reg_no
              );
            })
          );
        }
      }
    } else {
      if (data.department && data.shift && data.shift !== "both") {
        setAllData(
          allStudents.filter((i) => {
            return i.department === data.department && i.shift === data.shift;
          })
        );
      } else if (data.department && !data.shift) {
        setAllData(
          allStudents.filter((i) => {
            return i.department === data.department;
          })
        );
      } else if (data.shift && !data.department) {
        if (data.shift === "both") {
          setAllData(allStudents);
        } else {
          setAllData(
            allStudents.filter((i) => {
              return i.shift === data.shift;
            })
          );
        }
      }
    }
    if (!data.department && !data.shift && data.reg_no) {
      setAllData(
        allStudents.filter((i) => {
          return (
            i.registration_no === data.reg_no
          );
        })
      );
    }
  };

  return (
    <Index>
      <Meta title="All Students" />
      <div className="red-primary md:py-10 py-6 h-[100vh]">
        <div className="red-primary pt-6">
          {allStudents?.length === 0 && <Loader />}
        </div>
        {allStudents && (
          <>
            <section>
              <h1 className="md:text-5xl sm:text-3xl text-2xl text-center font-bold my-2">
                All Students
              </h1>
            </section>
            <section className="flex justify-center">
              <form onSubmit={handleSubmit(submitHandle)}>
                <div className="m-4 flex flex-col items-center sm:justify-evenly sm:flex-row md:items-center">
                  <div className="flex items-center space-x-2 mt-3 md:mr-6">
                    <h2 className="md:text-xl sm:text-lg text-base font-bold ">
                      Department:
                    </h2>
                    <select
                      name="department"
                      ref={register()}
                      className="mt-1 px-4 py-2 rounded-lg"
                    >
                      <option></option>
                      <option>Biology</option>
                      <option>Botany</option>
                      <option>Chemistry</option>
                      <option>Computer Science</option>
                      <option>Economics</option>
                      <option>English</option>
                      <option>Geography</option>
                      <option>Islamiyat</option>
                      <option>Math</option>
                      <option>Psychology</option>
                      <option>Physics</option>
                      <option>Political Science</option>
                      <option>Punjabi</option>
                      <option>Pak Studies</option>
                      <option>Sociology</option>
                      <option>Statistics</option>
                      <option>Urdu</option>
                      <option>Zoology</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2 mt-3 md:mr-6">
                    <h2 className="md:text-xl sm:text-lg text-base font-bold ">Shift:</h2>
                    <select
                      name="shift"
                      ref={register()}
                      className="mt-1 px-4 py-2 rounded-lg"
                    >
                      <option></option>
                      <option>both</option>
                      <option>Morning</option>
                      <option>Evening</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2 mt-3 md:mr-6">
                    <h2 className="md:text-xl sm:text-lg text-base font-bold ">Reg no.:</h2>
                    <input
                      name="reg_no"
                      ref={register()}
                      className="mt-1 px-2 py-2 rounded-lg w-44"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className=" rounded-full mt-3 bg-[#a02d29] hover:bg-[#af4844] p-4 text-white shadow-sm "
                    >
                      <FaSearch />
                    </button>
                  </div>
                </div>
              </form>
            </section>
            {(errors.department || errors.shift) && (
              <p className="mt-1 text-sm text-center text-red-600">
                {errors.shift
                  ? errors.shift.message
                  : errors.department.message}
              </p>
            )}
            <button
              onClick={() => {
                setAllData(allStudents);
                reset();
              }}
              className=" rounded-full mt-2 bg-[#a02d29] hover:bg-[#af4844] px-4 py-2 text-white shadow-sm block w-[100px] mx-auto"
            >
              Show All
            </button>
            {allData?.length === 0 ? (
              <div>
                <img
                  src="/images/no_data.png"
                  className="w-24 opacity-25 mx-auto mt-10"
                />
              </div>
            ) : (
              ""
            )}
            <AllStudentsItems
              allStudents={allData}
              refetchStudents={refetchStudents}
            />
          </>
        )}
      </div>
    </Index>
  );
}
export default requireSuperAdmin(allstudents);
