import React from 'react'
import ModalButton from 'components/attedance_system/common/ModalButton';
import AttendanceUpdateForm from './AttendanceUpdateForm';
import { toast } from 'react-toastify';
import { FaRegEdit } from 'react-icons/fa';
import { useStudent, useUser } from 'util/db';
import { useAuth } from 'util/auth';

const ClassAttendanceViewItem = ({ item, currentTime, givenDate, handleAttendance }) => {
    const bodyCellStyles = "md:min-w-[140px] md:text-lg text-sm font-semibold px-3 py-4 bg-red-200 border-b-2 border-red-300 text-sm md:text-lg"
    const auth = useAuth();
    const { data: userData } = useUser(auth?.user?.uid);
    const { data: studentData } = useStudent(item.student_id);
    return (
        <>
            {(userData && studentData) &&
                <tr>
                    <td className={`${bodyCellStyles} text-center`}>{studentData.college_rollno}</td>
                    <td className={`${bodyCellStyles} text-center`}>{studentData.university_rollno}</td>
                    <td className={`${bodyCellStyles} text-left`}>{studentData.name}</td>
                    <td className={`${bodyCellStyles} text-center`}>
                        {item.attendance === 'Present' ? (
                            <span style={{ color: 'green' }}>Present</span>
                        ) : item.attendance === 'Leave' ? (
                            <span style={{ color: 'blue' }}>Leave</span>
                        ) : (
                            <span style={{ color: 'red' }}>Absent</span>
                        )}
                    </td>
                    <td className={`${bodyCellStyles} text-left`}>{studentData.phone_number}</td>
                    <td className={`${bodyCellStyles} text-center`}>
                        <ModalButton
                            title="Update Students Attendance"
                            Content={({ toggleModal }) => {
                                return (
                                    <AttendanceUpdateForm
                                        onDone={() => {
                                            toggleModal();
                                        }}
                                        refetch={handleAttendance}
                                        id={item.id}

                                    />
                                );
                            }}
                            Button={({ toggleModal }) => {
                                return (
                                    <div className='flex justify-center'>
                                        {["super_admin", "department_Admin"].includes(userData?.roleas)
                                            &&
                                            <FaRegEdit onClick={() => toggleModal()} className="cursor-pointer" />
                                        }
                                        {["teacher"].includes(userData?.roleas)
                                            &&
                                            ((currentTime > givenDate) ?
                                                <FaRegEdit onClick={() => toast.warn("Attendance edit time out")} className="cursor-pointer" />
                                                :
                                                <FaRegEdit onClick={() => toggleModal()} className="cursor-pointer" />)
                                        }
                                    </div>
                                );
                            }}
                        />
                    </td>
                </tr>
            }
        </>
    )
}

export default ClassAttendanceViewItem
