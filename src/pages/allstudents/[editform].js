import AddStudentForm from "components/attedance_system/Dashboard/Addstudent/AddStudentForm";
import { useRouter } from "next/router";
import React from "react";
import { useStudent } from "util/db";
import { FaRegEdit } from "react-icons/fa";
import Loader from "components/attedance_system/common/Loader";
const editform = () => {
  const route = useRouter();
  const id = route?.asPath?.split("/")?.[2];
  const { data: data } = useStudent(id);
  return (
    <>
      {!data && <Loader />}
      {data && (
        
    <div className="bg-red-100 py-4">
          <h1 className="text-3xl text-center font-bold">Update Student</h1>
          <h1 className="text-xl text-center mt-3">
            {data?.name} <FaRegEdit className="inline-block mb-1 ml-2 text-red-500" />
          </h1>
          <AddStudentForm
            data={data}
            btnText={"Update Student"}
            target={"update"}
            id={id}
          />
        </div>
      )}
    </>
  );
};

export default editform;
