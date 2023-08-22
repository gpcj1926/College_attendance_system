import Loader from "components/attedance_system/common/Loader";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "util/auth";
import {
    createClass,
    updateClass,
    useClass,
} from "util/db";
import supabase from "util/supabase";

const ClassForm = ({ onDone, refetch, target, id }) => {

    const { register, handleSubmit, errors } = useForm();
    const sessionRegex = /^\d{4}-\d{4}$/;

    const auth = useAuth();
    const owner = auth?.user?.uid;

    const { data: itemData } = useClass(id);

    const handleClose = () => {
        onDone();
    };

    const submitHandle = async (data) => {
        console.log("submit");
        if (target === "create") {
            await createClass({ ...data, owner: owner });
            toast.success("successfully created!");
        } else {
            await updateClass(id, data);
            toast.success("successfully Updated!");
        }
        refetch();
        onDone();
    };

    const [allUsers, setAllusers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = () => {
        supabase.from("users").select("*").then((data) => { setAllusers(data.data) })
    }

    const sortedUsers = allUsers?.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    const teachers = sortedUsers?.filter((i) => {
        return i.roleas !== "super_admin";
    });

    const myFormComp = () => {
        return (
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
                            defaultValue={itemData && itemData.class_name}
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
                            htmlFor="teacher_id"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Select Teacher
                        </label>



                        <select
                            ref={register({
                                required: "Please select  Teacher",
                            })}
                            defaultValue={itemData && itemData?.teacher_id}
                            id="teacher_id"
                            name="teacher_id"
                            className="mt-2 block w-full border-2 border-gray-200  px-2 rounded-md bg-white py-1.5 text-gray-900 shadow-sm  sm:text-sm sm:leading-6"
                        >
                            <option></option>
                            {teachers?.map((i, index) => {
                                return (
                                    <option value={i.id} key={index}>
                                        {i.name}
                                    </option>
                                );
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
                            defaultValue={itemData && itemData.department}
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

                    {/* Shift */}
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                            htmlFor="shift"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Shift
                        </label>
                        <select
                            ref={register({
                                required: "Please select shift",
                            })}
                            defaultValue={itemData && itemData.shift}
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
                                pattern: {
                                    value: sessionRegex,
                                    message: "Please enter a valid session",
                                },
                            })}
                            defaultValue={itemData && itemData.session}
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
                </main>
                <div className="flex justify-end space-x-2">
                    <button onClick={handleClose} className="white-button" type="button">
                        Cancel
                    </button>
                    <button className="red-button" type="submit">
                        {target === "create" ? "Save" : "Update"}
                    </button>
                </div>
            </form>
        );
    };

    return (
        <>
            <div className="min-h-[200px]">
                {id ? (itemData && id) && myFormComp() : myFormComp()}
                {(id && !(itemData && id)) && <Loader />}
            </div>
        </>
    );
};

export default ClassForm;
