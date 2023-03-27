import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "util/auth";
import { createStudent } from "util/db";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddStudentForm() {
  const notify = () =>
    toast.success("Student Successfullt created", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const { register, handleSubmit, errors, reset } = useForm();
  const auth = useAuth();
  const owner = auth?.user?.uid;
  const submitHandle = async (data) => {
    await createStudent({ ...data, owner: owner });
    reset();
    notify();

    console.log(data);
  };
  // const cnicRegex = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
  // const sessionRegex = /^2019-(202[0-3])$/;

  return (
    <>
      <div className="w-[80%] mx-auto my-10 shadow-lg">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleSubmit(submitHandle)}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Profile
                  </label>
                  <input type="file" className="my-4" />
                </div>
                <div className="grid grid-cols-6 gap-6">
                  {/* Name */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <input
                      ref={register({
                        required: "Please enter name",
                      })}
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      className="mt-2 block w-full rounded-md py-1.5 border-2 border-gray-200  px-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-left text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Father name */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="father_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Father name
                    </label>
                    <input
                      ref={register({
                        required: "Please enter father's name",
                      })}
                      type="text"
                      name="father_name"
                      id="father_name"
                      autoComplete="father_name"
                      className="mt-2 block w-full rounded-md py-1.5 border-2 border-gray-200  px-2 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors.father_name && (
                      <p className="mt-1 text-sm text-left text-red-600">
                        {errors.father_name.message}
                      </p>
                    )}
                  </div>

                  {/* Roll no. (college) */}
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="college_rollno"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Roll no. (college)
                    </label>
                    <input
                      ref={register({
                        required: "Please enter Roll no.",
                      })}
                      type="text"
                      name="college_rollno"
                      id="college_rollno"
                      className="mt-2 block w-full rounded-md py-1.5 border-2 border-gray-200  px-2 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors.college_rollno && (
                      <p className="mt-1 text-sm text-left text-red-600">
                        {errors.college_rollno.message}
                      </p>
                    )}
                  </div>

                  {/* Roll no. (universty) */}
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="universty_rollno"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Roll no. (universty)
                    </label>
                    <input
                      ref={register({
                        required: "Please enter Roll no.",
                      })}
                      type="text"
                      name="university_rollno"
                      id="universty_rollno"
                      className="mt-2 block w-full rounded-md py-1.5 border-2 border-gray-200  px-2 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors.university_rollno && (
                      <p className="mt-1 text-sm text-left text-red-600">
                        {errors.university_rollno.message}
                      </p>
                    )}
                  </div>

                  {/* registration_no */}
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="registration_no"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Registration no.
                    </label>
                    <input
                      ref={register({
                        required: "Please enter Registration no",
                      })}
                      type="text"
                      name="registration_no"
                      id="registration_no"
                      className="mt-2 block w-full rounded-md py-1.5 border-2 border-gray-200  px-2 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors.registration_no && (
                      <p className="mt-1 text-sm text-left text-red-600">
                        {errors.registration_no.message}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="dateofbirth"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      DOB
                    </label>
                    <input
                      ref={register({
                        required: "Please enter date",
                      })}
                      type="date"
                      name="dateofbirth"
                      id="dateofbirth"
                      className="mt-2 block w-full rounded-md py-1.5 border-2 border-gray-200  px-2 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors.dateofbirth && (
                      <p className="mt-1 text-sm text-left text-red-600">
                        {errors.dateofbirth.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3 bg-white sm:p-2 mt-6 flex flex-wrap justify-between">
                    {/* Gender */}
                    <fieldset>
                      <div className="mt-2 flex flex-col space-x-6">
                        <div className="mt-2 flex space-x-6">
                          <div className="flex items-center">
                            <input
                              ref={register({
                                required: "Please select gender",
                              })}
                              id="male"
                              name="gender"
                              value="male"
                              type="radio"
                              className="h-4 w-4 border-gray-200 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="male_gender"
                              className="ml-2 block text-sm font-medium leading-6 text-gray-900"
                            >
                              Male
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              ref={register({
                                required: "Please select gender",
                              })}
                              id="female"
                              value="female"
                              name="gender"
                              type="radio"
                              className="h-4 w-4 border-gray-200 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="female_gender"
                              className="ml-2 block text-sm font-medium leading-6 text-gray-900"
                            >
                              Female
                            </label>
                          </div>
                        </div>

                        {errors.gender && (
                          <p className="mt-1 text-sm text-left text-red-600">
                            {errors.gender.message}
                          </p>
                        )}
                      </div>
                    </fieldset>

                    {/* Religion */}
                    <fieldset>
                      <div className="mt-2 flex flex-col space-x-6">
                        <div className="mt-2 flex space-x-6">
                          <div className="flex items-center">
                            <input
                              ref={register({
                                required: "Please select religion",
                              })}
                              id="muslim"
                              name="religion"
                              value="muslim"
                              type="radio"
                              className="h-4 w-4 border-gray-200 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="push-everything"
                              className="ml-2 block text-sm font-medium leading-6 text-gray-900"
                            >
                              Muslim
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              ref={register({
                                required: "Please select religion",
                              })}
                              id="non_muslim"
                              value="non muslim"
                              name="religion"
                              type="radio"
                              className="h-4 w-4 border-gray-200 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="eve_shift"
                              className="ml-2 block text-sm font-medium leading-6 text-gray-900"
                            >
                              Non-Muslim
                            </label>
                          </div>
                        </div>

                        {errors.religion && (
                          <p className="mt-1 text-sm text-left text-red-600">
                            {errors.religion.message}
                          </p>
                        )}
                      </div>
                    </fieldset>
                  </div>

                  {/* Email address */}
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="email_address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <input
                      ref={register({
                        required: "Please enter email address",
                      })}
                      type="email"
                      name="email_address"
                      id="email_address"
                      autoComplete="email"
                      className="mt-2 block w-full rounded-md py-1.5 border-2 border-gray-200  px-2 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors.email_address && (
                      <p className="mt-1 text-sm text-left text-red-600">
                        {errors.email_address.message}
                      </p>
                    )}
                  </div>

                  {/* Number */}
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="phone_number"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone number
                    </label>
                    <input
                      ref={register({
                        required: "Please enter phone number",
                      })}
                      type="text"
                      name="phone_number"
                      id="phone_number"
                      className="mt-2 block w-full rounded-md py-1.5 border-2 border-gray-200  px-2 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors.phone_number && (
                      <p className="mt-1 text-sm text-left text-red-600">
                        {errors.phone_number.message}
                      </p>
                    )}
                  </div>

                  {/* Cnic */}
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="cnic_no"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Student CNIC
                    </label>
                    <input
                      ref={register({
                        required: "Please enter Student CNIC",
                        // pattern: {
                        //   value: cnicRegex,
                        //   message: "Please enter a valid CNIC",
                        // },
                      })}
                      type="text"
                      name="cnic_no"
                      id="cnic_no"
                      placeholder="00000-0000000-0"
                      className="mt-2 block w-full rounded-md py-1.5 border-2 border-gray-200  px-2 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors.cnic_no && (
                      <p className="mt-1 text-sm text-left text-red-600">
                        {errors.cnic_no.message}
                      </p>
                    )}
                  </div>

                  {/* Department */}
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Department
                    </label>
                    <select
                      ref={register({
                        required: "Please select  department",
                      })}
                      id="department"
                      name="department"
                      className="mt-2 block w-full border-2 border-gray-200  px-2 rounded-md bg-white py-1.5 text-gray-900 shadow-sm  sm:text-sm sm:leading-6"
                    >
                      <option></option>
                      <option>Computer science</option>
                      <option>English</option>
                      <option>Math</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>Punjabi</option>
                    </select>
                    {errors.department && (
                      <p className="mt-1 text-sm text-left text-red-600">
                        {errors.department.message}
                      </p>
                    )}
                  </div>

                  {/* Semester */}
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="shift"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Shift
                    </label>
                    <select
                      ref={register({
                        required: "Please select semester",
                      })}
                      id="shift"
                      name="shift"
                      className="mt-2 block w-full border-2 border-gray-200  px-2 rounded-md bg-white py-1.5 text-gray-900 shadow-sm  sm:text-sm sm:leading-6"
                    >
                      <option></option>
                      <option>Morning</option>
                      <option>Evening</option>
                    </select>
                    {errors.shift && (
                      <p className="mt-1 text-sm text-left text-red-600">
                        {errors.shift.message}
                      </p>
                    )}
                  </div>

                  {/* Session */}
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="father_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Session
                    </label>
                    <input
                      ref={register({
                        required: "Please enter session",
                        // pattern: {
                        //   value: sessionRegex,
                        //   message: "Please enter a valid session",
                        // },
                      })}
                      type="text"
                      name="session"
                      id="session"
                      className="mt-2 block w-full rounded-md py-1.5 border-2 border-gray-200  px-2 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors.session && (
                      <p className="mt-1 text-sm text-left text-red-600">
                        {errors.session.message}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="col-span-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Address
                    </label>
                    <input
                      ref={register({
                        required: "Please enter address",
                      })}
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="address"
                      className="mt-2 block w-full rounded-md py-1.5 border-2 border-gray-200  px-2 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-left text-red-600">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md bg-[#a02d29] hover:bg-[#a74d4a] py-2 px-3 text-sm font-semibold text-white shadow-sm "
                >
                  Add Student
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}
