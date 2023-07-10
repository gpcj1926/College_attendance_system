import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "util/auth";
import { createClass, useAllUsers } from "util/db";

const ClassForm = ({ onDone, refetch }) => {
    const { register, handleSubmit, errors } = useForm();

    const auth = useAuth();
    const owner = auth?.user?.uid;
    const submitHandle = async (data) => {
        await createClass({ ...data, owner: owner });
        toast.success("successfully created!");
        onDone();
        refetch();

        // if (target === "create") {
        //   toast.success("successfully created!");
        //   await createClass({ ...data, owner: owner });
        // } else {
        //   await updateStudent(id, data);
        //   toast.success("successfully Updated!");
        //   router.replace("/allstudents");
        // }
    };

    const { data: allUsers } = useAllUsers();
    const sortedUsers = allUsers?.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    const approvedTeachers = sortedUsers?.filter((i) => {
        return i.roleas !== "super_admin";
    });

    return (
        <div>
            <form onSubmit={handleSubmit(submitHandle)}>
                <main className="my-3 space-y-3">
                    {/* Name */}
                    <div className="col-span-6 sm:col-span-3">
                        <label
                            htmlFor="class_name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Class name
                        </label>
                        <input
                            ref={register({
                                required: "Please enter name",
                            })}
                            // defaultValue={data && data.name}
                            type="text"
                            name="class_name"
                            id="class_name"
                            autoComplete="given-name"
                            className="mt-2 block w-full rounded-md py-1.5 border-2 border-gray-200  px-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                        {errors.class_name && (
                            <p className="mt-1 text-sm text-left text-red-600">
                                {errors.class_name.message}
                            </p>
                        )}
                    </div>
                    {/* Teacher */}
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                            htmlFor="teacher_name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Select Teacher
                        </label>
                        <select
                            ref={register({
                                required: "Please select  department",
                            })}
                            //   defaultValue={data && data.department}
                            id="teacher_name"
                            name="teacher_name"
                            className="mt-2 block w-full border-2 border-gray-200  px-2 rounded-md bg-white py-1.5 text-gray-900 shadow-sm  sm:text-sm sm:leading-6"
                        >
                            <option></option>

                            {approvedTeachers?.map((i, index) => {
                                return <option key={index}>{i.name}</option>;
                            })}
                        </select>
                        {errors.teacher_name && (
                            <p className="mt-1 text-sm text-left text-red-600">
                                {errors.teacher_name.message}
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
                            // defaultValue={data && data.department}
                            id="department"
                            name="department"
                            className="mt-2 block w-full border-2 border-gray-200  px-2 rounded-md bg-white py-1.5 text-gray-900 shadow-sm  sm:text-sm sm:leading-6"
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
                        {errors.department && (
                            <p className="mt-1 text-sm text-left text-red-600">
                                {errors.department.message}
                            </p>
                        )}
                    </div>
                    {/* Semester */}
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                            htmlFor="semester"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Select Semester
                        </label>
                        <select
                            ref={register({
                                required: "Please select  department",
                            })}
                            //   defaultValue={data && data.department}
                            id="semester"
                            name="semester"
                            className="mt-2 block w-full border-2 border-gray-200  px-2 rounded-md bg-white py-1.5 text-gray-900 shadow-sm  sm:text-sm sm:leading-6"
                        >
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                        </select>
                        {errors.semester && (
                            <p className="mt-1 text-sm text-left text-red-600">
                                {errors.semester.message}
                            </p>
                        )}
                    </div>
                </main>
                <div className="flex justify-end">
                    <button
                        onClick={() => {
                            onDone();
                        }}
                        className="white-button"
                    >
                        Cancel
                    </button>
                    <button className="red-button" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClassForm;
