import React, { useState } from "react";
import { Transition, Dialog } from "@headlessui/react";

export default function ModalButton({ label, title, Content, Button }) {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen((oldState) => !oldState);
  return (
    <div>
      {Button ? (
        <Button toggleModal={toggleModal} />
      ) : (
        <button
          className="  inline-flex justify-center py-2 px-4 ml-3 text-sm font-medium text-white rounded-md border border-transparent bg-[#5222D0]  hover:bg-[#441ab0]  "
          onClick={() => toggleModal()}
        >
          {label}
        </button>
      )}
      <Transition appear={modalOpen} show={modalOpen}>
        <Dialog
          id="Modal_container"
          as="div"
          className="overflow-y-auto fixed inset-0 z-40 "
          onClose={() => toggleModal()}
        >
          <div className="px-4 min-h-screen text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className=" inline-block my-8 w-full max-w-md text-left align-middle bg-white  rounded-2xl shadow-xl transition-all transform">
                <div className="m-6">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium  leading-6  text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-4 z-50">
                    <Content
                        toggleModal={toggleModal}
                      />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
