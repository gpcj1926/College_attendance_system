import Dashboard from 'components/attedance_system/Dashboard/Dashboard'
import React from 'react'
import { requireAuth } from 'util/auth';

const dashboard = () => {
  return (
    <Dashboard>

    <div>
      <h2 className='m-4 text-2xl font-bold'>
        Dashboard
      </h2>
    </div>
    </Dashboard>
  )
}

export default requireAuth(dashboard);