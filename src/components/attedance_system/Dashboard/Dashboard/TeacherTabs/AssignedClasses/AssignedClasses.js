import React, { useEffect, useState } from 'react'
import { useUser } from "util/db"
import supabase from "util/supabase"
import DepartmentClasses from "../../../Classes/DepartmentClasses"
import { useAuth } from 'util/auth'
const AssignedClasses = () => {
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
        <div className='mt-10'>
            <DepartmentClasses
                title={`Classes Assigned to you`}
                des={`Select class to mark attendance`}
                refetch={fetchClasses}
                data={specificClasses}
            />
        </div>
    )
}

export default AssignedClasses
