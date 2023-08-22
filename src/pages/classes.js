import React from 'react'
import ClassesPage from 'components/attedance_system/Dashboard/Classes/ClassesPage'
import { requireAuth, useAuth } from 'util/auth'
import { useUser } from 'util/db';
import NotApproved from 'components/attedance_system/common/NotApproved';
import Index from 'components/attedance_system/Dashboard/Index';
const classes = () => {
    const auth = useAuth();
    const { data: userData } = useUser(auth?.user?.id);
    return (
        <>
            <Index>

                {userData?.status === "Not Approved" ?
                    <NotApproved title={"still not approved"} />
                    :
                    <div>
                        <ClassesPage />
                    </div>
                }
            </Index>
        </>
    )
}

export default requireAuth(classes) 
