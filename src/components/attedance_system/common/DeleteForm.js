import React, { useState } from "react";
import { deleteStudent } from "util/db";
import Loader from "./Loader";

export default function DeleteForm({
  id,
  onDone,
  refetchStudents,
}) {
  const [loading, setLoading] = useState(false);
  const closeModal = () => {
    onDone();
  };
console.log(refetchStudents)
  const deleteItem = () => {
    setLoading(true);
    deleteStudent(id)
    setLoading(false);
    refetchStudents();
    onDone();
  };

  return (
    <>
      <div>
        <h2 className="">Are you sure to delete this Student!</h2>
      </div>
    <div className="flex justify-between items-center">
      <div>{loading && <Loader width="20px" />}</div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={closeModal}
          type="button"
          disabled={loading}
          className="text-[#202226] bg-gray-200 disabled:text-gray-500 rounded-lg text-nomral font-semibold px-5 py-2.5 mr-2 "
        >
          Cancel
        </button>
        <button
          onClick={deleteItem}
          disabled={loading}
          type="button"
          className="text-white bg-red-500 disabled:bg-red-300 rounded-lg text-nomral font-semibold px-5 py-2.5 "
        >
          {loading ? "..." : "Delete"}
        </button>
      </div>
    </div>
    </>
  );
}
