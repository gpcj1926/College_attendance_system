import React from "react";
import {
  FaAddressCard,
  FaEnvelope,
  FaPhoneAlt,
  FaChevronDown,
  FaRegTrashAlt,
  FaRegEdit,
  FaUserGraduate,
  FaShieldAlt,
  FaCalendarCheck,
  FaHome,
  FaUserCog,
  FaUserTie,
} from "react-icons/fa";
import { MdDateRange, MdAccountBox, MdSchool } from "react-icons/md";
import { Disclosure, Transition } from "@headlessui/react";
import ModalButton from "../../common/ModalButton";
import DeleteForm from "../../common/DeleteForm";
import Link from "next/link";

export default function AllStudentsItems({ allStudents, refetchStudents }) {
  return (
    <div className="bg-red-100 pb-10">
      {allStudents?.map((student) => {
        return (
          <div key={student.id} className=" m-4 w-[95%] lg:w-[70%] mx-auto">
            <Disclosure>
              <div className="flex justify-between bg-white p-4 shadow-md rounded-full">
                <div className="flex items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="Edit"
                    className="h-8 w-8 cursor-pointer"
                  />
                  <div className="flex flex-col ml-4">
                    <h1 className="sm:text-xl text-base text-red-500 font-bold">
                      {student.name}
                    </h1>
                    <h3 className="text-gray-500">{student.registration_no}</h3>
                  </div>
                </div>
                <div className="flex space-x-4 items-center">
                  <div className="text-gray-600 flex space-x-4 sm:text-xl text-base">
                    <Link href={`/allstudents/${student.id}`}>
                    <FaRegEdit className="cursor-pointer" />
                    </Link>
                    <ModalButton
                      title="Delete Student"
                      Content={({ toggleModal }) => {
                        return (
                          <DeleteForm
                            onDone={() => {
                              toggleModal();
                            }}
                            refetchStudents={refetchStudents}
                            id={student.id}
                          />
                        );
                      }}
                      Button={({ toggleModal }) => {
                        return (

                          <FaRegTrashAlt onClick={() => toggleModal()} className="cursor-pointer" />
                        );
                      }}
                    />

                  </div>
                  <Disclosure.Button>
                    <FaChevronDown className="sm:text-lg text-base" />
                  </Disclosure.Button>
                </div>
              </div>
              <Transition
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
              >
                <Disclosure.Panel>
                  <div className="p-6 bg-gray-50 rounded-3xl mx-2 mt-4 shadow-lg relative">
                    <div className="text-white font-semibold bg-green-600 p-1 rounded-xl absolute right-4 top-2">
                      {student.shift}
                    </div>
                    <div className=" flex flex-wrap items-center">
                      <div className="mr-0 sm:mr-8">
                        <div className="flex flex-wrap items-center mt-4 pb-4 border-b-2">
                          <FaUserTie className="text-red-600 mr-4 text-lg" />
                          <p className="font-bold text-sm">Father Name:</p>
                          <p className="ml-4 text-sm">{student.father_name}</p>
                        </div>
                        <div className="flex items-center mt-4 pb-4 border-b-2">
                          <MdSchool className="text-red-600 mr-4 text-lg" />
                          <p className="font-bold text-sm">Department:</p>
                          <p className="ml-4 text-sm">{student.department}</p>
                        </div>
                        <div className="flex items-center mt-4 pb-4 border-b-2">
                          <MdAccountBox className="text-red-600 mr-4 text-lg" />
                          <p className="font-bold text-sm">College Rollno.:</p>
                          <p className="ml-4 text-sm">{student.college_rollno}</p>
                        </div>
                        <div className="flex items-center mt-4 pb-4 border-b-2">
                          <FaAddressCard className="text-red-600 mr-4 text-lg" />
                          <p className="font-bold text-sm">CNIC No:</p>
                          <p className="ml-4 text-sm">{student.cnic_no}</p>
                        </div>
                        <div className="flex items-center mt-4 pb-4 border-b-2">
                          <FaEnvelope className="text-red-600 mr-4 text-lg" />
                          <p className="font-bold text-sm">Email Address:</p>
                          <p className="ml-4 text-sm">{student.email_address}</p>
                        </div>
                        <div className="flex items-center mt-4 pb-4 border-b-2">
                          <FaPhoneAlt className="text-red-600 mr-4 text-lg" />
                          <p className="font-bold text-sm">Phone Number:</p>
                          <p className="ml-4 text-sm">{student.phone_number}</p>
                        </div>
                      </div>

                      <div className="">
                        <div className="flex items-center mt-4 pb-4 border-b-2">
                          <FaUserCog className="text-red-600 mr-4 text-lg" />
                          <p className="font-bold text-sm">Gender:</p>
                          <p className="ml-4 text-sm">{student.gender}</p>
                        </div>
                        <div className="flex items-center mt-4 pb-4 border-b-2">
                          <FaUserGraduate className="text-red-600 mr-4 text-lg" />
                          <p className="font-bold text-sm">Registration No:</p>
                          <p className="ml-4 text-sm">{student.registration_no}</p>
                        </div>
                        <div className="flex items-center mt-4 pb-4 border-b-2">
                          <MdAccountBox className="text-red-600 mr-4 text-lg" />
                          <p className="font-bold text-sm">University Rollno.:</p>
                          <p className="ml-4 text-sm">{student.university_rollno}</p>
                        </div>
                        <div className="flex items-center mt-4 pb-4 border-b-2">
                          <MdDateRange className="text-red-600 mr-4 text-lg" />
                          <p className="font-bold text-sm">Date of Birth:</p>
                          <p className="ml-4 text-sm">
                            {new Date(student.dateofbirth).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center mt-4 pb-4 border-b-2">
                          <FaCalendarCheck className="text-red-600 mr-4 text-lg" />
                          <p className="font-bold text-sm">Session:</p>
                          <p className="ml-4 text-sm">{student.session}</p>
                        </div>
                        <div className="flex items-center mt-4 pb-4 border-b-2">
                          <FaShieldAlt className="text-red-600 mr-4 text-lg" />
                          <p className="font-bold text-sm">Religion:</p>
                          <p className="ml-4 text-sm">{student.religion}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center">
                        <FaHome className="text-red-600 mr-4 text-lg" />
                        <p className="font-bold text-sm">Address:</p>
                        <p className="ml-4 text-sm">{student.address}</p>
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
  );
}
