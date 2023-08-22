import React from 'react'
import Link from 'next/link';
import { useAllUsers } from 'util/db';
const ClassAttendanceRow = ({ data }) => {

    const { data: allUsers } = useAllUsers();
    const sortedUsers = allUsers?.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    const approvedTeachers = sortedUsers?.filter((i) => {
        return i.roleas !== "super_admin";
    });
    return (
        <div>
            <div className='flex justify-center my-6 flex-wrap'>
                <table>
                    <thead>
                        <tr>
                            <th className='bg-red-800 text-white p-4 '>Subject</th>
                            <th className='bg-red-800 text-white p-4 border-l-2 border-white'>Teacher</th>
                            <th className='bg-red-800 text-white p-4 border-l-2 border-white'>session</th>
                            <th className='bg-red-800 text-white p-4 border-l-2 border-white'>Shift</th>
                            <th className='bg-red-800 text-white p-4 border-l-2 border-white'>Department</th>
                            <th className='bg-red-800 text-white p-4 border-l-2 border-white'>Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((i) => {
                            return (
                                <tr key={i.id} className="bg-white border-b-2 ">
                                    <td>
                                        <h1 className="sm:text-xl text-base text-red-500 font-bold p-4">
                                            {i.class_name}
                                        </h1>
                                    </td>
                                    <td>
                                        <h3 className="text-gray-500 text-center p-4">{approvedTeachers?.filter(teacher => { return teacher?.id === i?.teacher_id })?.[0]?.name}</h3>
                                    </td>
                                    <td>
                                        <h3 className="text-gray-500 text-center p-4"> {i.session}</h3>
                                    </td>
                                    <td>
                                        <h3 className="text-gray-500 text-center p-4">{i.shift}</h3>
                                    </td>
                                    <td>
                                        <h3 className="text-gray-500 text-center p-4">{i.department}</h3>
                                    </td>
                                    <td>
                                        <Link href={`attendance/${i.id}`}>
                                            <div className='p-4'>
                                                <button className='red-button'>
                                                    View Attendance
                                                </button>
                                            </div>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ClassAttendanceRow
