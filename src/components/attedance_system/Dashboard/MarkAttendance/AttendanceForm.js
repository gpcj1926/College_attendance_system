import Loader from "components/attedance_system/common/Loader";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "util/auth";
import { createAttendance, useAllAttendance } from "util/db";

const AttendanceForm = ({ students, subject, class_id }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const auth = useAuth();
  const onSubmit = async (data) => {
    const attendanceData = Object.keys(data).map((studentId) => {
      const selectedStudent = students.find(
        (student) => student.id === studentId
      );
      return {
        student_id: studentId,
        class_id: class_id,
        teacher_id: auth.user.uid,
        attendance: data[studentId],
        name: selectedStudent.name,
        college_rollno: selectedStudent.college_rollno,
        university_rollno: selectedStudent.university_rollno,
        phone_number: selectedStudent.phone_number,
        subject: subject,
      };
    });
    const successResults = [];
    const errorResults = [];

    for (const data of attendanceData) {
      try {
        const result = await createAttendance({
          ...data,
          owner: auth.user.uid,
        });
        successResults.push(result);
      } catch (error) {
        errorResults.push({ data, error });
      }
    }

    if (successResults.length > 0) {
      toast.success("Successfully Marked");
    }

    if (errorResults.length > 0) {
      errorResults.forEach(({ data, error }) => {
        console.error(`Error marking attendance for:`, data);
        console.error("Error details:", error);
        toast.error(
          `Error marking attendance for: ${data.someUniqueIdentifier}`
        );
      });
    }

    reset();
  };
  function formatDate(inputDate) {
    let dateObj;

    if (typeof inputDate === "string") {
      dateObj = new Date(inputDate);
    } else if (inputDate instanceof Date) {
      dateObj = inputDate;
    } else {
      throw new Error("Invalid input date format");
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  const { data: attendanceData } = useAllAttendance();
  const CheckAttendance = attendanceData?.filter((i) => {
    return (
      i.class_id === class_id &&
      formatDate(i.createdAt) === formatDate(new Date())
    );
  });
  return (
    <div className="h-screen">
      {!students && <Loader />}
      {students && (
        <>
          {CheckAttendance?.length > 0 &&
            <div>
              <h3 className="text-center text-red-800 my-4 animate-bounce">
                *Today's attendance has already been taken*
              </h3>
            </div>
          }
          <section className="m-3 w-[95%] lg:w-[80%] mx-auto">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="md:overflow-x-hidden overflow-x-scroll">
                <table className=" w-[95%] lg:w-full mx-auto">
                  <thead>
                    <tr>
                      <th className="p-3 md:text-lg text-sm border-r-[1px] border-gray-200 bg-red-800 text-white">
                        No.
                      </th>
                      <th className="p-3 md:text-lg text-sm border-r-[1px] border-gray-200 bg-red-800 text-white">
                        Roll no.
                      </th>
                      <th className="p-3 md:text-lg text-sm border-r-[1px] border-gray-200 bg-red-800 text-white">
                        Uni Roll no.
                      </th>
                      <th className="p-3 md:text-lg text-sm border-r-[1px] border-gray-200 bg-red-800 text-white text-left">
                        Name
                      </th>
                      <th className="p-3 md:text-lg text-sm border-r-[1px] border-gray-200 bg-red-800 text-white text-center">
                        Attendance
                      </th>
                      <th className="p-3 md:text-lg text-sm bg-red-800 text-white">
                        Phone no.
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students
                      ?.sort((a, b) => a.college_rollno - b.college_rollno)
                      ?.map((student, index) => (
                        <tr
                          key={student.id}
                          className="border-t-[1px] border-red-300"
                        >
                          <td>
                            <div className="md:text-lg text-center text-sm font-semibold px-3 py-4">
                              {index + 1}.
                            </div>
                          </td>
                          <td>
                            <div className="md:text-lg text-center text-sm font-semibold px-3 py-4">
                              {student.college_rollno}
                            </div>
                          </td>
                          <td>
                            <div className="md:text-lg text-center text-sm font-semibold px-3 py-4">
                              {student.university_rollno}
                            </div>
                          </td>
                          <td>
                            <h2 className="md:text-lg text-sm text-red-700 font-semibold px-3 py-4">
                              {student.name}
                            </h2>
                          </td>
                          <td className="flex mt-1 justify-center py-4">
                            <select
                              ref={register({
                                required: "Required",
                              })}
                              name={student.id}
                              className=" text-center p-1"
                            >
                              <option className="p-2"></option>
                              <option className="p-2">Present</option>
                              <option className="p-2">Absent</option>
                              <option className="p-2">Leave</option>
                            </select>
                            {errors.student?.id && (
                              <p className="mt-1 text-sm text-left text-red-600">
                                {errors.student?.id.message}
                              </p>
                            )}
                          </td>
                          <td>
                            <h2 className="md:text-lg text-center text-sm text-red-700 font-semibold px-3 py-4">
                              {student.phone_number}
                            </h2>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-6">
                {CheckAttendance?.length > 0 ? (
                  <button className="red-button" disabled>
                    Already taken
                  </button>
                ) : (
                  <button className="red-button" type="submit">
                    Submit Attendance
                  </button>
                )}
              </div>
            </form>
          </section>
        </>
      )}
    </div>
  );
};

export default AttendanceForm;
