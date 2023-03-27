import React, { useEffect, useState } from "react";
import supabase from "util/supabase";
import AllStudentsItems from "components/attedance_system/common/AllStudentsItems";
import Loader from "components/attedance_system/common/Loader";
import Dashboard from "components/attedance_system/Dashboard/Dashboard";
import { requireAuth } from "util/auth";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAllStudents } from "util/db";

function allstudents() {
  // const [allStudents, setAllStudents] = useState([{name:"kashif"}]);
  // useEffect(() => {
  //   fetchStudents();
  // }, []);
  // const fetchStudents = async () => {
  //   const { data } = await supabase.from("students").select("*");
  //   setAllStudents(data);
  // };
  const { register, handleSubmit} = useForm();

  const submitHandle = async (data) => {
    console.log(data);
  };

  const {data:allStudents , refetch: refetchStudents} = useAllStudents();
  console.log(allStudents , "mydata")

  return (
    <Dashboard>
      <div className="bg-red-100 py-20">
        {allStudents?.length === 0 && <Loader />}
        {allStudents && (
          <>
            <section className="flex justify-center">
              <form onSubmit={handleSubmit(submitHandle)}>
                <div className="m-4 flex flex-col justify-items-start sm:justify-evenly sm:flex-row items-center space-x-6">
                  <div className="flex items-center space-x-2 mt-3">
                    <h2 className="sm:text-xl text-lg font-bold ">Department:</h2>
                    <select
                      name="department"
                      ref={register()}
                      className="mt-1 px-4 py-2 rounded-lg"
                    >
                      <option></option>
                      <option>Computer science</option>
                      <option>English</option>
                      <option>Math</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>Punjabi</option>
                    </select>
                  </div>
                  {/* <div className="flex items-center space-x-2 mt-3">
                    <h2 className="sm:text-xl text-lg font-bold ">Semester:</h2>
                    <select
                      name="semester"
                      ref={register()}
                      className="mt-1 px-4 py-2 rounded-lg"
                    >
                      <option></option>
                      <option>2</option>
                      <option>4</option>
                      <option>6</option>
                      <option>8</option>
                    </select>
                  </div> */}
                  <div className="flex items-center space-x-2 mt-3">
                    <h2 className="sm:text-xl text-lg font-bold ">Shift:</h2>
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
            <AllStudentsItems allStudents={allStudents} refetchStudents={refetchStudents} />
          </>
        )}
      </div>
    </Dashboard>
  );
}
export default requireAuth(allstudents);
