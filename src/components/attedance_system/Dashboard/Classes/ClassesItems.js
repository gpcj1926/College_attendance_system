import React from 'react'
import ModalButton from 'components/attedance_system/common/ModalButton';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import ClassForm from './ClassForm';
import Link from 'next/link';
import { useAllUsers, useUser } from 'util/db';
import { useAuth } from 'util/auth';
import DeleteForm from 'components/attedance_system/common/DeleteForm';

const ClassesItems = ({ data, refetch }) => {
  const auth = useAuth();
  const { data: userData } = useUser(auth?.user?.uid);
  const { data: allUsers } = useAllUsers();
  const sortedUsers = allUsers?.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  const approvedTeachers = sortedUsers?.filter((i) => {
    return i.roleas !== "super_admin";
  });

  return (
    <>
      <div className='flex justify-center my-6 flex-wrap red-primary'>
        {data?.map((i) => {
          return (
            <main key={i.id} className="bg-white p-4 shadow-lg m-4 min-w-[250px] relative rounded-lg">
              <div className="flex flex-col">
                <Link href={`classes/${i.id}`}>
                  <h1 className="sm:text-xl hover:underline cursor-pointer text-base text-red-500 font-bold">
                    {i.class_name}
                  </h1>
                </Link>
                <h3 className="text-gray-500">Teacher : {approvedTeachers?.filter(teacher => { return teacher?.id === i?.teacher_id })?.[0]?.name}</h3>
                <h3 className="text-gray-500">session : {i.session}</h3>
                <h3 className="text-gray-500">Shift : {i.shift}</h3>
                <h3 className="text-gray-500">Department : {i.department}</h3>
              </div>
              {["super_admin", 'department_admin'].includes(userData?.roleas) && (
                <div className="flex space-x-4 items-center absolute top-3 right-3">
                  <ModalButton
                    title="Update Class"
                    Content={({ toggleModal }) => {
                      return (
                        <ClassForm
                          onDone={() => {
                            toggleModal();
                          }}
                          refetch={refetch}
                          target={'update'}
                          id={i.id}

                        />
                      );
                    }}
                    Button={({ toggleModal }) => {
                      return (
                        <FaRegEdit onClick={() => toggleModal()} className="cursor-pointer" />
                      );
                    }}
                  />
                  <ModalButton
                    title="Delete Class"
                    Content={({ toggleModal }) => {
                      return (
                        <DeleteForm
                          onDone={() => {
                            toggleModal();
                          }}
                          refetch={refetch}
                          id={i.id}
                          target={"class"}
                        />
                      );
                    }}
                    Button={({ toggleModal }) => {
                      return (
                        <FaRegTrashAlt
                          onClick={() => toggleModal()}
                          className="cursor-pointer"
                        />
                      );
                    }}
                  />
                </div>)}
              {["super_admin", 'department_admin'].includes(userData?.roleas) && (
                <div className="flex justify-end mt-3">
                  <Link href={`/attendance/${i.id}`}>
                    <button className='red-button text-xs'>Show attendance</button>
                  </Link>
                </div>
              )}
            </main>
          )
        })}
      </div>
    </>
  )
}

export default ClassesItems
