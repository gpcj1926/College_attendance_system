import React from 'react'
import Index from 'components/attedance_system/Dashboard/Index'
import { requireAuth } from 'util/auth'

const markattendance = () => {
  return (
    <Index>
      <>
      <div className='pt-10 h-screen bg-red-100'>
<h1 className='text-3xl text-center font-bold'>

Mark Attendance
</h1>
      </div>
      </>
    </Index>
  )
}

export default requireAuth(markattendance)
