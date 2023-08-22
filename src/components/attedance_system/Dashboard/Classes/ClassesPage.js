import ClassForm from "./ClassForm";
import AllClasses from "./AllClasses";
import DepartmentClasses from "./DepartmentClasses";
import React, { useEffect, useState } from "react";
import { useAuth } from "./../../../../util/auth";
import { useUser } from "./../../../../util/db";
import supabase from "./../../../../util/supabase";
import ModalButton from './../../common/ModalButton'
import { FaPlus } from "react-icons/fa";

const ClassesPage = () => {
    const auth = useAuth();

    const [myClasses, setMyClasses] = useState([])

    useEffect(() => {
        fetchClasses()
    }, [])

    const fetchClasses = () => {
        supabase.from("classes").select("*").then((data) => { setMyClasses(data.data) })
    }

    const { data: userData } = useUser(auth?.user?.uid);
    const specificClasses = myClasses?.filter((i) => {
        return i.department === userData?.department;
    })
    return (
        <>
            {myClasses && <section className="red-primary pt-10 h-screen relative">
                <div className="fixed bottom-16 right-16">
                    {
                        ["super_admin", 'department_admin'].includes(userData?.roleas) ?
                            <main className="ml-2">
                                <ModalButton
                                    title="Add new Class"
                                    Content={({ toggleModal }) => {
                                        return (
                                            <ClassForm
                                                onDone={() => {
                                                    toggleModal();
                                                }}
                                                refetch={fetchClasses}
                                                target={"create"}
                                            />
                                        );
                                    }}
                                    Button={({ toggleModal }) => {
                                        return (
                                            <button className="text-3xl rounded-full mt-3 bg-red-800 hover:bg-red-700 p-4 text-white shadow-sm " onClick={() => toggleModal()}>
                                                <FaPlus />
                                            </button>
                                        );
                                    }}
                                />
                            </main>
                            : ''
                    }
                </div>
                {["super_admin"].includes(userData?.roleas) && (
                    <AllClasses title='All the Classes' refetch={fetchClasses} data={myClasses} />
                )}

                {['department_admin'].includes(userData?.roleas) && (
                    <DepartmentClasses
                        title={`Classes of ${userData?.department}`}
                        refetch={fetchClasses}
                        data={specificClasses}
                    />
                )}
            </section>}
        </>
    );
};

export default ClassesPage;
