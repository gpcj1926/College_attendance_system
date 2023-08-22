import Index from "components/attedance_system/Dashboard/Index";
import AttendanceForm from "components/attedance_system/Dashboard/MarkAttendance/AttendanceForm";
import { useRouter } from "next/router";
import React from "react";
import { requireAuth } from "util/auth";
import { useAllStudents, useClass } from "util/db";

const Class = () => {
    const route = useRouter();
    const id = route?.asPath?.split("/")?.[2];

    const { data: classData } = useClass(id);
    const { data } = useAllStudents();

    const students = data?.filter((i) => {
        return (
            i.department === classData?.department &&
            i.session === classData?.session &&
            i.shift === classData?.shift
        );
    });
    const formattedDate = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
    return (
        <>
            <Index>
                <section className="pt-10 red-primary h-screen">
                    <h1 className="pt-10 pb-6 text-3xl text-center font-bold">
                        Mark Attendance
                    </h1>
                    <main className="flex flex-wrap justify-center space-x-6 py-2">
                        <div className="flex space-x-2">
                            <h2 className="md:text-lg text-sm font-semibold text-red-700">
                                Subject:
                            </h2>
                            <h3 className="md:text-lg text-sm font-semibold">
                                {classData?.class_name}
                            </h3>
                        </div>
                        <div className="flex space-x-2">
                            <h2 className="md:text-lg text-sm font-semibold text-red-700">
                                Students:
                            </h2>
                            <h3 className="md:text-lg text-sm font-semibold">
                                {students?.length}
                            </h3>
                        </div>
                        <div className="flex space-x-2">
                            <h2 className="md:text-lg text-sm font-semibold text-red-700">
                                Date:
                            </h2>
                            <h3 className="md:text-lg text-sm font-semibold">
                                {formattedDate}
                            </h3>
                        </div>
                        <div className="flex space-x-2">
                            <h2 className="md:text-lg text-sm font-semibold text-red-700">
                                Session:
                            </h2>
                            <h3 className="md:text-lg text-sm font-semibold">
                                {classData?.session}
                            </h3>
                        </div>
                    </main>
                    <div className="red-primary">
                        <AttendanceForm class_id={id} students={students} subject={classData?.class_name} />
                    </div>
                </section>
            </Index>
        </>
    );
};

export default requireAuth(Class);
