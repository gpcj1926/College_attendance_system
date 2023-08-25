import Loader from "components/attedance_system/common/Loader";
import React from "react";
import { useForm } from "react-hook-form";
import { updateUser, useUser } from "util/db";
import { FaUserAlt, FaUserGraduate } from "react-icons/fa";

const RequestEditForm = ({ onDone, id, refetchUsers }) => {
  const { data: Userdata } = useUser(id);
  const { register, handleSubmit, errors } = useForm();
  const closeModal = () => {
    onDone();
  };
  const UpdateUserHandle = (data) => {
    updateUser(id, data)
    refetchUsers();
    onDone();
  };
  const sectionStyle = {
    height: '320px',
    overflowY: 'auto',
    WebkitScrollbar: {
      width: '0.5em',
      backgroundColor: 'transparent',
    },
  };

  return (
    <div>
      {!Userdata && <Loader />}

      {Userdata && (
        <form onSubmit={handleSubmit(UpdateUserHandle)}>
          <main style={sectionStyle} className="">

            {/* personal Information */}
            <section>
              <div className="flex justify-between my-4">
                <h2 className="font-semibold text-red-700">
                  Personal Information
                </h2>
                <FaUserAlt className="text-red-700 text-xl" />
              </div>
              <div className="my-4">
                <div className='flex justify-start space-x-2'>
                  <h2 className='md:text-lg text-sm font-bold'>Name : </h2>
                  <h5 className='md:text-lg text-sm'>{Userdata?.name}</h5>
                </div>
                <div className='flex justify-start space-x-2'>
                  <h2 className='md:text-lg text-sm font-bold'>Email. : </h2>
                  <h5 className='md:text-lg text-sm'>{Userdata?.email}</h5>
                </div>
                <div className='flex justify-start space-x-2'>
                  <h2 className='md:text-lg text-sm font-bold'>Phone number : </h2>
                  <h5 className='md:text-lg text-sm'>{Userdata.mobileno ? Userdata?.mobileno : "Not yet Added"}</h5>
                </div>
              </div>
            </section>
            <hr />
            {/* College Information */}
            <section>
              <div className="flex justify-between my-4">
                <h2 className="font-semibold text-red-700">
                  College Information
                </h2>
                <FaUserGraduate className="text-red-700 text-xl" />
              </div>
              <div className="my-4">

                <div className="flex items-center">
                  <label className="text-lg text-normal mr-4 font-medium text-gray-700">
                    Department:
                  </label>
                  <select
                    defaultValue={Userdata && Userdata.department}
                    ref={register({
                      required: "Please select Department",
                    })}
                    type="text"
                    name="department"
                    id="department"
                    className="mb-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm py-2 px-1"
                  >
                    <option></option>
                    <option>Biology</option>
                    <option>Botany</option>
                    <option>Chemistry</option>
                    <option>Computer Science</option>
                    <option>Economics</option>
                    <option>English</option>
                    <option>Geography</option>
                    <option>Islamiyat</option>
                    <option>Math</option>
                    <option>Psychology</option>
                    <option>Physics</option>
                    <option>Political Science</option>
                    <option>Punjabi</option>
                    <option>Pak Studies</option>
                    <option>Sociology</option>
                    <option>Statistics</option>
                    <option>Urdu</option>
                    <option>Zoology</option>
                  </select>
                </div>
                {errors.department && (
                  <div className="text-sm text-red-700">
                    {errors.department.message}
                  </div>
                )}


                <div className="flex items-center">
                  <label className="text-lg text-normal mr-4 font-medium text-gray-700">
                    Status:
                  </label>
                  <select
                    defaultValue={Userdata && Userdata.status}
                    ref={register({
                      required: "Please select Status",
                    })}
                    type="text"
                    name="status"
                    id="status"
                    className="mb-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm py-2 px-1"
                  >
                    <option></option>
                    <option>Approved</option>
                    <option>Not Approved</option>
                  </select>
                </div>
                {errors.status && (
                  <div className="text-sm text-red-700">
                    {errors.status.message}
                  </div>
                )}
              </div>
            </section>
          </main>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="text-white bg-red-500 rounded-lg text-nomral font-semibold px-5 py-2.5 mr-2 "
            >
              Update
            </button>
            <button
              onClick={closeModal}
              type="button"
              className="text-[#202226]  bg-gray-200 rounded-lg text-nomral font-semibold px-5 py-2.5 "
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RequestEditForm;
