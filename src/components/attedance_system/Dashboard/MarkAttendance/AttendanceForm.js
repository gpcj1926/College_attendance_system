import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAllStudents } from "util/db";
import supabase from "util/supabase";

const AttendanceForm = () => {
  const { data: allStudents, refetch: refetchStudents } = useAllStudents();

  const [students, setStudents] = useState(allStudents);
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
      student_name: students.find((s) => s.id === a.id).name,
      date,
      status: a.status,
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
  return (
    <div>
      <form className="m-3" onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {students?.map((student) => (
            <li className="my-2" key={student.id}>
              {student.name}
              <label
                className="m-3 bg-red-200 p-2 rounded-lg"
              >
                Present
                <input
                className="m-3"
                  type="radio"
                  {...register(`attendance.${student.id}.status`)}
                  value="PRESENT"
                  checked={attendance.some(
                    (a) => a.id === student.id && a.status === "PRESENT"
                  )}
                  onChange={() => handleAttendanceChange(student.id, "PRESENT")}
                />
              </label>
              <label
                className="m-3 bg-red-200 p-2 rounded-lg"
              >
                Absent
                <input
                className="m-3"
                  type="radio"
                  {...register(`attendance.${student.id}.status`)}
                  value="ABSENT"
                  checked={attendance.some(
                    (a) => a.id === student.id && a.status === "ABSENT"
                  )}
                  onChange={() => handleAttendanceChange(student.id, "ABSENT")}
                />
              </label>
              <label
                className="m-3 bg-red-200 p-2 rounded-lg"
              >
                Leave
                <input
                className="m-3"
                  type="radio"
                  {...register(`attendance.${student.id}.status`)}
                  value="LEAVE"
                  checked={attendance.some(
                    (a) => a.id === student.id && a.status === "LEAVE"
                  )}
                  onChange={() => handleAttendanceChange(student.id, "LEAVE")}
                />
              </label>
            </li>
          ))}
        </ul>
        <button
          className="inline-flex justify-center rounded-md bg-[#a02d29] hover:bg-[#a74d4a] py-2 px-3 text-sm font-semibold text-white shadow-sm "
          type="submit"
          disabled={true}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
