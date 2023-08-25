import React, { useState } from "react";
import { deleteAttendance, deleteClass, deleteStudent, useAllAttendance } from "util/db";
import Loader from "./Loader";
import { toast } from "react-toastify";

export default function DeleteForm({
  id,
  onDone,
  target,
  refetch,
}) {
  const [loading, setLoading] = useState(false);
  const closeModal = () => {
    onDone();
  };
  const { data: allAttendance } = useAllAttendance();
  const deleteItem = () => {
    setLoading(true);
    if (target === "student") {
      deleteStudent(id)
    }
    else if (target === "class") {
      deleteClass(id)
      const attendanceForDeletion = allAttendance.filter(i => { return i.class_id === id })
      attendanceForDeletion.forEach(x => {
        deleteAttendance(x.id)
      });
    }
    toast.success("successfully Deleted!");
    refetch();
    setLoading(false);
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
