import React from "react";
import { useAllUsers } from "util/db";
import Loader from "components/attedance_system/common/Loader";
import {
  FaChevronDown,
  FaRegTrashAlt,
  FaRegEdit,
  FaUserCog,
  FaUserTie,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { Disclosure, Transition } from "@headlessui/react";
import ModalButton from "components/attedance_system/common/ModalButton";
import RequestEditForm from "../Requests/RequestEditForm";
import TeacherDeleteForm from "../Requests/TeacherDeleteForm";

const TeachersItem = ({refetchUsers, data , dataType}) => {

  return (
    <>
        <div className="bg-red-100 py-6 w-[97%] md-[70%] mx-auto">
          <main className="flex flex-wrap justify-between items-center m-4 mb-6">
            <h2 className="text-2xl md:text-4xl font-bold m-2">
              {dataType}
            </h2>
            <div className="flex space-x-2 m-2">
              <h1 className="text-lg md:text-xl font-bold"> Number :</h1>
              <h3 className="text-lg">{data?.length}</h3>
            </div>
          </main>
          <div className="">
            {data?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))?.map((user) => {
              return (
                <div key={user.id} className=" m-4 w-[95%] lg:w-[70%] mx-auto">
                  <Disclosure>
                    <div className="flex justify-between bg-white p-4 shadow-md rounded-full">
                      <div className="flex items-center">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt="Edit"
                          className="h-8 w-8 cursor-pointer"
                        />
                        <div className="flex items-center ml-4">
                          <h1 className="sm:text-xl text-base text-red-500 font-bold">
                            {user.name}
                          </h1>
                          <h3 className="text-xl ml-2">
                            {user.status === "Approved" ? (
                              <span className="text-green-600">
                                <FaCheckCircle />
                              </span>
                            ) : user.status === "Not Approved" ? (
                              <span className="text-red-600">
                                <FaExclamationCircle />
                              </span>
                            ) : (
                              <span className="text-red-600">Blocked</span>
                            )}
                          </h3>
                        </div>
                      </div>
                      <div className="flex space-x-4 items-center">
                        <div className="text-gray-600 flex space-x-4 sm:text-xl text-base">
                          <ModalButton
                            title={`Edit request`}
                            Content={({ toggleModal }) => {
                              return (
                                <RequestEditForm
                                  onDone={() => {
                                    toggleModal();
                                  }}
                                  id={user.id}
                                  refetchUsers={refetchUsers}
                                />
                              );
                            }}
                            Button={({ toggleModal }) => {
                              return (
                                <div>
                                  <FaRegEdit
                                    onClick={() => {
                                      toggleModal();
                                    }}
                                    className="text-red-700 mr-3 cursor-pointer"
                                  />
                                </div>
                              );
                            }}
                          />
                          <ModalButton
                            title={`Delete Request`}
                            Content={({ toggleModal }) => {
                              return <TeacherDeleteForm
                              onDone={() => {
                                toggleModal();
                              }}
                              id={user.id}
                              refetchUsers={refetchUsers}
                              />;
                            }}
                            Button={({ toggleModal }) => {
                              return (
                                <div>
                                  <FaRegTrashAlt
                                    onClick={() => {
                                      toggleModal();
                                    }}
                                    className="text-red-700 mr-3 cursor-pointer"
                                  />
                                </div>
                              );
                            }}
                          />
                          {/* <FaRegEdit className="cursor-pointer" /> */}
                          {/* <FaRegTrashAlt className="cursor-pointer" /> */}
                        </div>
                        <Disclosure.Button>
                          <FaChevronDown className="sm:text-lg text-base mr-2" />
                        </Disclosure.Button>
                      </div>
                    </div>
                    <Transition
                      enter="transition-opacity duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                    >
                      <Disclosure.Panel>
                        <div className="p-6 bg-gray-50 rounded-3xl mx-2 mt-4 shadow-lg">
                          <div className="flex flex-wrap md:flex-nowrap items-center md:justify-between justify-start">
                            <div className="mx-2">
                              <div className="flex items-center mt-4 pb-4 border-b-2">
                                <FaUserTie className="text-red-600 mr-4 text-xl" />
                                <p className="font-bold sm:text-base text-sm">
                                  Email :
                                </p>
                                <p className="ml-4  sm:text-base text-sm">
                                  {user.email}
                                </p>
                              </div>
                              <div className="flex items-center mt-4 pb-4 border-b-2">
                                <FaUserTie className="text-red-600 mr-4 text-xl" />
                                <p className="font-bold sm:text-base text-sm">
                                  Status :
                                </p>
                                <p className="ml-4  sm:text-base text-sm">
                                  {user.status}
                                </p>
                              </div>
                            </div>

                            <div className="mx-2">
                              <div className="flex items-center mt-4 pb-4 border-b-2">
                                <FaUserCog className="text-red-600 mr-4 text-xl" />
                                <p className="font-bold sm:text-base text-sm">
                                  Role :
                                </p>
                                <p className="ml-4  sm:text-base text-sm">
                                  {user.roleas}
                                </p>
                              </div>
                              <div className="flex items-center mt-4 pb-4 border-b-2">
                                <FaUserCog className="text-red-600 mr-4 text-xl" />
                                <p className="font-bold sm:text-base text-sm">
                                  Department :
                                </p>
                                <p className="ml-4  sm:text-base text-sm">
                                  {user.department}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </Disclosure>
                </div>
              );
            })}
          </div>
        </div>
    </>
  );
};

export default TeachersItem;
