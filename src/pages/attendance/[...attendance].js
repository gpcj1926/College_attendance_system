import React from 'react'
import Index from './../../components/attedance_system/Dashboard/Index'
import { useRouter } from 'next/router';
import { useAllAttendance, useClass } from "util/db";
import ClassAttendanceView from '../../components/attedance_system/Dashboard/MarkAttendance/ClassAttendanceView';
import { requireAuth } from "util/auth";


const attendance = () => {
    const route = useRouter();
    const id = route?.query?.attendance?.[0];
    const { data: myClass } = useClass(id)
    const { data: attendanceData } = useAllAttendance();
    const Attendance = attendanceData?.filter(i => { return i.class_id === id })
    return (
        <Index>
            <div className='pt-10 red-primary h-screen'>
                <ClassAttendanceView attendanceData={Attendance?.sort((a, b) => a.college_rollno - b.college_rollno)} myClass={myClass} />
            </div>
        </Index>
    )
}

export default requireAuth(attendance) 
