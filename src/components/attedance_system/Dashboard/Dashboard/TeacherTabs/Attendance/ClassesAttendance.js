import React, { useEffect, useState } from 'react'
import ClassAttendanceRow from "./ClassAttendanceRow"
import { useAuth } from 'util/auth';
import supabase from 'util/supabase';
import { useUser } from 'util/db';
import Loader from 'components/attedance_system/common/Loader';

const ClassesAttendance = () => {

    const auth = useAuth();

    const [myClasses, setMyClasses] = useState([])

    useEffect(() => {
        fetchClasses()
    }, [])

    const fetchClasses = () => {
        supabase.from("classes").select("*").then((data) => { setMyClasses(data.data) })
    }

    const { data: userData } = useUser(auth?.user?.uid);
    const specificClasses = myClasses?.filter((i) => {
        return i.department === userData?.department && i.teacher_id === userData?.id;
    })

    return (
        <div className='pt-10'>
            {!specificClasses && <Loader />}
            {specificClasses &&
                <>
                    <h2 className="text-2xl text-center md:text-4xl font-bold m-2">Students Attendance</h2>

                    <ClassAttendanceRow data={specificClasses} />
                </>
            }
        </div>
    )
}

export default ClassesAttendance
