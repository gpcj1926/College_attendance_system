import React, { useEffect, useState } from "react";
import ClassesItems from "./ClassesItems";
import { FaSearch } from "react-icons/fa";

const AllClasses = ({ data, refetch, title }) => {
    const [classData, setClassData] = useState(data);
    const [myclass, setMyClass] = useState("All classes");

    const handleClass = () => {
        if (myclass === "All classes") {
            setClassData(data);
        } else {
            setClassData(
                data.filter((i) => {
                    return i.department === myclass;
                })
            );
        }
    };
    useEffect(() => {
        setClassData(data);
    }, [data]);
    return (
        <>
            {data.length === 0 ? (
                <div className="mt-20 text-center text-red-800">
                    *Click on Add button to create class*
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl text-center md:text-4xl font-bold m-2">
                        {title}
                    </h2>
                    <h2 className="text-lg text-center font-semibold m-2">
                        On Updating Class previous attendance will be lost
                    </h2>
                    <div className="flex justify-center items-center space-x-4 my-10">
                        <select
                            value={myclass}
                            onChange={(e) => {
                                setMyClass(e.target.value);
                            }}
                            className="p-2 text-xl rounded-lg"
                        >
                            <option>All classes</option>
                            <option>Biology</option>
                            <option>Botany</option>
                            <option>Chemistry</option>
                            <option>Computer Science</option>
                            <option>Economics</option>
                            <option>English</option>
                            <option>Geography</option>
                            <option>Islamiyat</option>
                            <option>Math</option>
                            <option>Psychology</option>
                            <option>Physics</option>
                            <option>Political Science</option>
                            <option>Punjabi</option>
                            <option>Pak Studies</option>
                            <option>Sociology</option>
                            <option>Statistics</option>
                            <option>Urdu</option>
                            <option>Zoology</option>
                        </select>
                        <button
                            onClick={handleClass}
                            className=" rounded-full bg-[#a02d29] hover:bg-[#af4844] p-4 text-white shadow-sm "
                        >
                            <FaSearch />
                        </button>
                    </div>
                    <ClassesItems data={classData} refetch={refetch} />
                    {classData.length === 0 && (
                        <div className="my-10 mx-2 text-red-700 text-center">
                            *This Department have no Classes*
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default AllClasses;
