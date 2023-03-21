import React, { useEffect, useState } from 'react'
import { requireAuth } from 'util/auth';
import supabase from 'util/supabase';
import Dashboard from 'components/attedance_system/Dashboard/Dashboard'
import Loader from 'components/attedance_system/common/Loader';

const dashboard = () => {
  const [allStudents, setAllStudents] = useState([])
  useEffect( () => {
    fetchStudents();
  }, [])
  const fetchStudents = async ()=>{
    const { data } =  await supabase.from("students").select('*')
    console.log(data,"data")
    setAllStudents(data)}
  return (
    <Dashboard>
      {!allStudents && <Loader/>}
      {allStudents && 
    <div className='bg-red-100 py-20'>
      <h2 className='text-4xl font-bold'>
        Dashboard
      </h2>
      <main className='m-4'>
        <div className='flex space-x-2'>
          <h1 className='text-xl font-bold'>Total Students :</h1>
          <h3 className='text-lg'>{allStudents.length}</h3>
        </div>
      </main>
    </div>
    }
    </Dashboard>
  )
}

export default requireAuth(dashboard);