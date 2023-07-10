import Loader from "components/attedance_system/common/Loader";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAllStudents } from "util/db";
import supabase from "util/supabase";

const AttendanceForm = () => {
  const { data: allStudents } = useAllStudents();
  const [attendance, setAttendance] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  const handleAttendanceChange = (id, status) => {
    setAttendance((prevAttendance) => {
      const existingAttendance = prevAttendance.find((a) => a.id === id);
      if (existingAttendance) {
        return prevAttendance.map((a) => (a.id === id ? { ...a, status } : a));
      } else {
        return [...prevAttendance, { id, status }];
      }
    });
  };
  const onSubmit = async (data) => {
    const date = new Date().toISOString().substr(0, 10);
    const attendanceData = attendance.map((a) => ({
      student_name: allStudents.find((s) => s.id === a.id).name,
      date,
      status: data.status,
    }));
    const { data: insertedData, error } = await supabase
      .from("attendance")
      .insert(attendanceData);
    if (error) {
      console.error(error);
    } else {
      console.log(insertedData);
      reset(); // reset the form after successful submission
    }
  };
  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
  return (
    <div className="h-screen">
      {!allStudents && <Loader />}
      {allStudents && (
        <>
          <section className="m-3 w-[95%] lg:w-[60%] mx-auto">
            <main className="flex flex-wrap justify-center space-x-4 py-2">
            <div className="flex space-x-2">
              <h2 className="md:text-lg text-sm font-semibold text-red-700">Subject:</h2>
              <h3 className="md:text-lg text-sm font-semibold">DBMS</h3>
            </div>
            <div className="flex space-x-2">
              <h2 className="md:text-lg text-sm font-semibold text-red-700">Students:</h2>
              <h3 className="md:text-lg text-sm font-semibold">60</h3>
            </div>
                        <div className="flex space-x-2">
              <h2 className="md:text-lg text-sm font-semibold text-red-700">Date:</h2>
              <h3 className="md:text-lg text-sm font-semibold">{formattedDate}</h3>
            </div>
            </main>
            <div>
              <img src="/Images/border.png" className="h-6 w-[40%] mx-auto object-cover my-6"/>
            </div>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className=" overflow-x-auto">

          
              <table className="mx-auto">
                {allStudents?.map((student, index) => (
                  <tr key={student.id}>
                    <td className="sm:pr-6 pr-2 flex space-x-2 mt-4">
                      <div className="md:text-lg text-sm font-semibold">{index+1}.</div>
                      <h2 className="md:text-lg text-sm text-red-700 font-semibold">
                        {student.name}
                      </h2>
                    </td>
                    <td>
                      <label className="m-3 bg-red-200 p-2 rounded-lg flex items-center">
                        <div>Present</div>
                        <input
                          className="ml-2"
                          type="radio"
                          {...register(`attendance.${student.id}.status`)}
                          value="PRESENT"
                          checked={attendance.some(
                            (a) => a.id === student.id && a.status === "PRESENT"
                          )}
                          onChange={() =>
                            handleAttendanceChange(student.id, "PRESENT")
                          }
                        />
                      </label>
                    </td>
                    <td>
                      <label className="m-3 bg-red-200 p-2 rounded-lg flex items-center">
                        <div>Absent</div>
                        <input
                          className="ml-2"
                          type="radio"
                          {...register(`attendance.${student.id}.status`)}
                          value="ABSENT"
                          checked={attendance.some(
                            (a) => a.id === student.id && a.status === "ABSENT"
                          )}
                          onChange={() =>
                            handleAttendanceChange(student.id, "ABSENT")
                          }
                        />
                      </label>
                    </td>
                    <td>
                      <label className="m-3 bg-red-200 p-2 rounded-lg flex items-center">
                        <div>Leave</div>
                        <input
                          className="ml-2"
                          type="radio"
                          {...register(`attendance.${student.id}.status`)}
                          value="LEAVE"
                          checked={attendance.some(
                            (a) => a.id === student.id && a.status === "LEAVE"
                          )}
                          onChange={() =>
                            handleAttendanceChange(student.id, "LEAVE")
                          }
                        />
                      </label>
                    </td>
                  </tr>
                ))}
              </table>
                  </div>
              <div className="flex justify-center mt-6">
                <button
                  className="cursor-pointer rounded-md bg-red-700 hover:bg-red-600 py-2 px-3 text-sm font-semibold text-white shadow-sm"
                  type="submit"
                  disabled={true}
                >
                  Submit Attendance
                </button>
              </div>
            </form>
          </section>
        </>
      )}
    </div>
  );
};

export default AttendanceForm;
