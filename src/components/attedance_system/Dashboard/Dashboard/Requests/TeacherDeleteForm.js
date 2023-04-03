import React from 'react'
import { deleteUser } from 'util/db'

const TeacherDeleteForm = ({id , refetchUsers ,onDone}) => {
    const deleteThisUser=()=>{
deleteUser(id)
refetchUsers();
onDone();
    }
  return (
    <div>
      are you sure to delete
      <br/>
      <button onClick={deleteThisUser} >yes</button>
    </div>
  )
}

export default TeacherDeleteForm