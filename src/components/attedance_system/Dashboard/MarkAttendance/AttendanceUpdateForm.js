import Loader from 'components/attedance_system/common/Loader';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { updateAttendance, useAttendance } from 'util/db';

const AttendanceUpdateForm = ({ onDone, refetch, id }) => {

    const { register, handleSubmit, errors } = useForm();
    const { data: itemData } = useAttendance(id);

    const handleClose = () => {
        onDone();
    };

    const submitHandle = async (data) => {
        await updateAttendance(id, data);
        toast.success("successfully Updated!");
        refetch();
        onDone();
    };


    const myFormComp = () => {
        return (
            <form onSubmit={handleSubmit(submitHandle)}>
                <main className="my-3 space-y-3">
                    <div className='flex justify-start space-x-2'>
                        <h2 className='md:text-lg text-sm font-bold'>Name : </h2>
                        <h5 className='md:text-lg text-sm'>{itemData?.name}</h5>
                    </div>
                    <div className='flex justify-start space-x-2'>
                        <h2 className='md:text-lg text-sm font-bold'>Roll no. : </h2>
                        <h5 className='md:text-lg text-sm'>{itemData?.college_rollno}</h5>
                    </div>
                    <div className='flex justify-start space-x-2'>
                        <h2 className='md:text-lg text-sm font-bold'>Phone number : </h2>
                        <h5 className='md:text-lg text-sm'>{itemData?.phone_number}</h5>
                    </div>
                    {/* Shift */}
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                            htmlFor="attendance"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Attendance
                        </label>
                        <select
                            ref={register({
                                required: "Please select attendance",
                            })}
                            defaultValue={itemData && itemData.attendance}
                            id="attendance"
                            name="attendance"
                            className="mt-2 block w-full border-2 border-gray-200  px-2 rounded-md bg-white py-1.5 text-gray-900 shadow-sm  sm:text-sm sm:leading-6"
                        >
                            <option>Present</option>
                            <option>Absent</option>
                            <option>Leave</option>
                        </select>
                        {errors.shift && (
                            <p className="mt-1 text-sm text-left text-red-600">
                                {errors.shift.message}
                            </p>
                        )}
                    </div>
                </main>
                <div className="flex justify-end space-x-2">
                    <button onClick={handleClose} className="white-button" type="button">
                        Cancel
                    </button>
                    <button className="red-button" type="submit">
                        {"Update"}
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
export default AttendanceUpdateForm
