import React from 'react'
import AddStudentForm from 'components/attedance_system/Dashboard/Addstudent/AddStudentForm'
import Index from 'components/attedance_system/Dashboard/Index'
import { requireAuth, requireSuperAdmin } from 'util/auth';
import Meta from 'components/Meta';

function addstudent() {

  return (
    <Index>
        <Meta title="Add Students"/>
      <div className='bg-red-100 py-20'>
        <h2 className='text-3xl font-bold text-center'>Add new Student</h2>
        <AddStudentForm />
      </div>
    </Index>
  )
}
export default requireAuth(requireSuperAdmin(addstudent));
