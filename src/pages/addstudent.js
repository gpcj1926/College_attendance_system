import React from 'react'
import AddStudentForm from 'components/attedance_system/common/AddStudentForm'
import Dashboard from 'components/attedance_system/Dashboard/Dashboard'
import { requireAuth } from 'util/auth';

 function addstudent() {

  return (
    <Dashboard>
      <div className='bg-red-100 py-20'>
<h2 className='text-3xl font-bold text-center'>Add new Student</h2>
      <AddStudentForm />
      </div>
    </Dashboard>
  )
}
export default requireAuth(addstudent);
