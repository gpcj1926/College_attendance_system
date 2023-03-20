import React, { useEffect, useState } from 'react'
import supabase from 'util/supabase'
import AllStudentsItems from 'components/attedance_system/common/AllStudentsItems'
import Loader from 'components/attedance_system/common/Loader'
import Dashboard from 'components/attedance_system/Dashboard/Dashboard'
import { requireAuth } from 'util/auth'

function allstudents() {
    const [allStudents, setAllStudents] = useState([])
    useEffect( () => {
      fetchStudents();
    }, [])
    const fetchStudents = async ()=>{
      const { data } =  await supabase.from("students").select('*')
      console.log(data,"data")
      setAllStudents(data)}
      console.log(allStudents)
  return (
    <Dashboard>

    <div>
        {
            allStudents?.length === 0 && <Loader/>
        }
        {
            allStudents && 
      <AllStudentsItems allStudents={allStudents} />
        }
      
    </div>
    </Dashboard>
  )
}
export default requireAuth(allstudents);
