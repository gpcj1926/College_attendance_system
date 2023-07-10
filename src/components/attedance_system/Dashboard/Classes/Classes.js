import React from 'react'
import Index from '../Index'
import ModalButton from 'components/attedance_system/common/ModalButton';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Link from 'next/link';
import ClassForm from './ClassForm';
import { useAllclasses } from 'util/db';
import DeleteForm from 'components/attedance_system/common/DeleteForm';

const Classes = () => {
  const allClasses = [
    { name: "English" },
    { name: "English" },
    { name: "English" },
    { name: "English" },
    { name: "English" },
  ]
  const { data: data, refetch } = useAllclasses();
  return (
    <>
      <Index>
        <section className='bg-red-100 pt-10 h-screen'>
          <main className='ml-2'>
            <ModalButton
              title="Add new Class"
              Content={({ toggleModal }) => {
                return (
                  <ClassForm
                    onDone={() => {
                      toggleModal();
                    }}
                    refetch={refetch}
                  />
                );
              }}
              Button={({ toggleModal }) => {
                return (
                  <button
                    className='red-button'
                    onClick={() => toggleModal()}
                  >
                    Add Class
                  </button>
                );
              }}
            />
          </main>
          <div className='flex flex-wrap'>
            {data?.map((i) => {
              return (
                <main className="bg-white p-4 shadow-md m-4 pr-20 relative">
                  <div className="flex flex-col">
                    <Link href={`classes/${i.id}`}>
                      <h1 className="sm:text-xl hover:underline cursor-pointer text-base text-red-500 font-bold">
                        {i.class_name}
                      </h1>
                    </Link>
                    <h3 className="text-gray-500">Teacher : {i.teacher_name}</h3>
                    <h3 className="text-gray-500">Semester : {i.semester}</h3>
                    <h3 className="text-gray-500">Department : {i.department}</h3>
                  </div>
                  <div className="flex space-x-4 items-center absolute top-3 right-3">
                    <FaRegEdit className="cursor-pointer" />
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
                  </div>
                </main>
              )
            })}
          </div>
        </section>
      </Index>
    </>
  )
}

export default Classes
