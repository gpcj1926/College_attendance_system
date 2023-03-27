import React from 'react'
import { requireAuth } from 'util/auth';
import Index from 'components/attedance_system/Dashboard/Index'
import { useAllStudents } from 'util/db';
import Loader from 'components/attedance_system/common/Loader';
import Meta from 'components/Meta';

const dashboard = () => {
  const { data: allStudents } = useAllStudents();
  // console.log(allStudents , "mydata")
  return (
    <Index>
        <Meta title="Dashboard"/>
      {!allStudents && <Loader />}
      {allStudents &&
        <div className='bg-red-100 py-20 px-6'>
          <h2 className='text-4xl font-bold'>
            Dashboard
          </h2>
          <main className='m-4 h-[100vh]'>
            <div className='flex space-x-2'>
              <h1 className='text-xl font-bold'>Total Students :</h1>
              <h3 className='text-lg'>{allStudents.length}</h3>
            </div>
          </main>
        </div>
      }
    </Index>
  )
}

export default requireAuth(dashboard);