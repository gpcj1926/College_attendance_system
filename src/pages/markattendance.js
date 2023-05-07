import React from "react";
import Index from "components/attedance_system/Dashboard/Index";
import { requireAuth } from "util/auth";
import AttendanceForm from "components/attedance_system/Dashboard/MarkAttendance/AttendanceForm";

const markattendance = () => {
  return (
    <Index>
      <>
        <div className="bg-red-100">
          <h1 className="pt-10 pb-6 text-3xl text-center font-bold">
            Mark Attendance
          </h1>
          <AttendanceForm />
        </div>
      </>
    </Index>
  );
};

export default requireAuth(markattendance);
