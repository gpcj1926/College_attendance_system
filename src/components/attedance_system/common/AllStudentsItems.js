import React from "react";
import {
  FaAddressCard,
  FaEnvelope,
  FaPhone,
  FaUserAlt,
  FaChevronDown,
} from "react-icons/fa";
import { MdDateRange, MdAccountBox, MdSchool } from "react-icons/md";
import { Disclosure ,Transition } from "@headlessui/react";

export default function AllStudentsItems({ allStudents }) {
  return (
    <div>
      {allStudents.map((student) => {
        return (

          <div key={student.id} className=" m-4 w-[70%] mx-auto">
            <Disclosure>
              <div className="flex justify-between bg-blue-300 p-6 shadow-md rounded-md">
                <div className="flex items-center">
                  <FaUserAlt className="text-2xl" />
                  <h1 className="text-2xl font-bold ml-4">{student.name}</h1>
                </div>
                <div className="flex space-x-4 items-center">
                  <p className="text-gray-600">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </p>
                  <Disclosure.Button>
                    <FaChevronDown className="text-lg" />
                  </Disclosure.Button>
                </div>
              </div>
              <Transition
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
              >
                <Disclosure.Panel>
                  <div className="p-6 bg-blue-100">
                    <div className="grid grid-cols-2 gap-6 mt-4">
                      <div className="col-span-1">
                        <div className="flex items-center mb-4">
                          <FaAddressCard className="text-gray-600 mr-2" />
                          <p className="font-bold">CNIC No:</p>
                        </div>
                        <p>{student.cnic_no}</p>
                        <div className="flex items-center mt-4 mb-4">
                          <FaEnvelope className="text-gray-600 mr-2" />
                          <p className="font-bold">Email Address:</p>
                        </div>
                        <p>{student.email_address}</p>
                        <div className="flex items-center mt-4 mb-4">
                          <FaPhone className="text-gray-600 mr-2" />
                          <p className="font-bold">Phone Number:</p>
                        </div>
                        <p>{student.phone_number}</p>
                        <div className="flex items-center mt-4">
                          <MdAccountBox className="text-gray-600 mr-2" />
                          <p className="font-bold">Religion:</p>
                        </div>
                        <p>{student.religion}</p>
                      </div>
                      <div className="col-span-1">
                        <div className="flex items-center mb-4">
                          <MdDateRange className="text-gray-600 mr-2" />
                          <p className="font-bold">Date of Birth:</p>
                        </div>
                        <p>
                          {new Date(student.dateofbirth).toLocaleDateString()}
                        </p>
                        <div className="flex items-center mt-4 mb-4">
                          <MdSchool className="text-gray-600 mr-2" />
                          <p className="font-bold">Department:</p>
                        </div>
                        <p>{student.department}</p>
                        <div className="flex items-center mt-4 mb-4">
                          <MdAccountBox className="text-gray-600 mr-2" />
                          <p className="font-bold">Registration No:</p>
                        </div>
                        <p>{student.registration_no}</p>
                        <div className="flex items-center mt-4">
                          <MdDateRange className="text-gray-600 mr-2" />
                          <p className="font-bold">Session:</p>
                        </div>
                        <p>{student.session}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="flex items-center mb-4">
                        <FaAddressCard className="text-gray-600 mr-2" />
                        <p className="font-bold">Address:</p>
                      </div>
                      <p>{student.address}</p>
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
