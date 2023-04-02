import React from "react";
import { useAllStudents } from "util/db";
const StudentsAnalytics = () => {
  const { data: studentData } = useAllStudents();
  const subjects = [
    { name: "Biology" },
    { name: "Botany" },
    { name: "Chemistry" },
    { name: "Computer Science" },
    { name: "Economics" },
    { name: "English" },
    { name: "Geography" },
    { name: "Islamiyat" },
    { name: "Math" },
    { name: "Psychology" },
    { name: "Physics" },
    { name: "Political Science" },
    { name: "Punjabi" },
    { name: "Pak Studies" },
    { name: "Sociology" },
    { name: "Statistics" },
    { name: "Urdu" },
    { name: "Zoology" },
  ];
  const halfLength = Math.ceil(subjects.length / 2);
  const firstHalf = subjects.slice(0, halfLength);
  const secondHalf = subjects.slice(halfLength);
  return (
    <div className="bg-red-100 py-6">
      <div className="flex items-center justify-center p-6">
        <h2 className="text-2xl font-bold">Total no. of Students: </h2>
        <h3 className="text-2xl font-semibold ml-3">{studentData?.length}</h3>
      </div>
      <main className="flex flex-wrap justify-center bg-red-100">
        <table className="bg-red-600 m-4">
          <tbody>
            <tr>
            <td className="px-5 py-2 bg-red-700 text-white border-2 border-red-700 ">
              Subject
            </td>
            <td className="px-5 py-2 bg-red-700 text-white border-2 border-red-700 ">
              No. of Students
            </td>
            </tr>
            {firstHalf.map((subject, index) => (
              <tr className="" key={index}>
                <td className="px-5 py-2 bg-red-200 border-2 border-red-700">
                  {subject.name}
                </td>
                <td className="px-5 py-2 bg-red-200 border-2 border-red-700 text-center">
                  {
                    studentData?.filter((x) => {
                      return x.department === subject.name;
                    })?.length
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="bg-red-600 m-4">
          <tbody>
            <tr>

            <td className="px-5 py-2 bg-red-700 text-white border-2 border-red-700 ">
              Subject
            </td>
            <td className="px-5 py-2 bg-red-700 text-white border-2 border-red-700 ">
              No. of Students
            </td>
            </tr>
            {secondHalf.map((subject, index) => (
              <tr className="" key={index}>
                <td className="px-5 py-2 bg-red-200 border-2 border-red-700">
                  {subject.name}
                </td>
                <td className="px-5 py-2 bg-red-200 border-2 border-red-700 text-center">
                  {
                    studentData?.filter((x) => {
                      return x.department === subject.name;
                    })?.length
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default StudentsAnalytics;
