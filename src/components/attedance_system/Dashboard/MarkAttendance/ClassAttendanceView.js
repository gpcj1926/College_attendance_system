import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf';
import { FaFilePdf } from 'react-icons/fa';
import 'jspdf-autotable';
import collegeLogo from './../../common/collegeLogo'

const ClassAttendanceView = ({ attendanceData, myClass }) => {
    const bodyCellStyles = "md:min-w-[140px] md:text-lg text-sm font-semibold px-3 py-4 bg-red-200 border-b-2 border-red-300 text-sm md:text-lg"
    const headCellStyles = "md:min-w-[140px] p-3 md:text-lg text-sm border-r-[1px] text-white text-center bg-red-800 text-sm md:text-lg"
    function formatDate(inputDate) {
        let dateObj;

        if (typeof inputDate === 'string') {
            dateObj = new Date(inputDate);
        } else if (inputDate instanceof Date) {
            dateObj = inputDate;
        } else {
            throw new Error("Invalid input date format");
        }

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }
    function generatePDF(data) {
        const doc = new jsPDF();
        const tableHeaders = ['Roll No', 'Name', 'Attendance', 'Phone Number'];
        const tableData = data?.map(item => [item.college_rollno, item.name, item.attendance, item.phone_number]);

        const pageWidth = doc.internal.pageSize.getWidth();
        const imageWidth = 20;
        const xCoordinate = (pageWidth - imageWidth) / 2;

        doc.addImage(collegeLogo, 'PNG', xCoordinate, 10, imageWidth, 23);
        doc.setFontSize(20);
        doc.text("Government Post Graduate College Jhang", doc.internal.pageSize.getWidth() / 2, 40, 'center');

        // Add content above the table
        doc.setFontSize(16);
        doc.text('Attendance Report', doc.internal.pageSize.getWidth() / 2, 50, 'center'); // Centered title

        doc.setFontSize(12);
        doc.text(`Subject: ${myClass?.class_name}`, 10, 60);
        doc.text(`Date: ${myDate}`, 10, 70);
        doc.text(`Department: ${myClass?.department}`, 10, 80);
        doc.text(`Session: ${myClass?.session}`, 10, 90);


        doc.autoTable({
            head: [tableHeaders],
            body: tableData,
            startY: 100,
        });

        doc.save('attendance_report.pdf');
    }

    const [myDate, setMyDate] = useState(formatDate(new Date()))
    const [myAttendance, setMyAttendance] = useState(attendanceData?.filter(i => { return formatDate(i.createdAt) === myDate }))
    useEffect(() => {
        setMyAttendance(attendanceData?.filter(i => { return formatDate(i.createdAt) === myDate }))
    }, [attendanceData])
    const handleAttendance = () => {
        setMyAttendance(attendanceData?.filter(i => { return formatDate(i.createdAt) === myDate }))
    }
    console.log(formatDate(attendanceData?.[0].createdAt))
    console.log(myDate)
    return (
        <div className='red-primary pb-10'>
            <h1 className="pt-10 pb-6 text-3xl text-center font-bold">
                Attendance
            </h1>
            <section className='flex space-x-2 justify-center my-4'>
                <input className='p-2 text-xl rounded-lg' type='date' value={myDate} onChange={(e) => { setMyDate(e.target.value) }} />
                <button className='red-button' onClick={handleAttendance}>Show Attendance</button>
            </section>
            <div className='flex justify-center'>
                <button className='white-button' onClick={() => { generatePDF(myAttendance) }}>Generate pdf <FaFilePdf className='inline-block ml-2' /> </button>
            </div>
            <main className="flex flex-wrap justify-center space-x-6 py-4">
                <div className="flex space-x-2">
                    <h2 className="md:text-lg text-sm font-semibold text-red-700">
                        Subject:
                    </h2>
                    <h3 className="md:text-lg text-sm font-semibold">
                        {myClass?.class_name}
                    </h3>
                </div>
                <div className="flex space-x-2">
                    <h2 className="md:text-lg text-sm font-semibold text-red-700">
                        Students:
                    </h2>
                    <h3 className="md:text-lg text-sm font-semibold">
                        {myAttendance?.length}
                    </h3>
                </div>
                <div className="flex space-x-2">
                    <h2 className="md:text-lg text-sm font-semibold text-red-700">
                        Date:
                    </h2>
                    <h3 className="md:text-lg text-sm font-semibold">
                        {myDate}
                    </h3>
                </div>
                <div className="flex space-x-2">
                    <h2 className="md:text-lg text-sm font-semibold text-red-700">
                        Session:
                    </h2>
                    <h3 className="md:text-lg text-sm font-semibold">
                        {myClass?.session}
                    </h3>
                </div>
            </main>
            <section className=' md:overflow-hidden overflow-x-scroll'>
                <table className='md:mx-auto'>
                    <thead>
                        <tr>
                            <td className={headCellStyles}>sr no.</td>
                            <td className={headCellStyles}>Roll No.</td>
                            <td className={headCellStyles}>Name</td>
                            <td className={headCellStyles}>Attendance</td>
                            <td className={headCellStyles}>Uni roll No.</td>
                            <td className={headCellStyles}>Phone Number</td>
                        </tr>
                    </thead>
                    <tbody>
                        {myAttendance?.map((i, index) => {
                            return (
                                <tr>
                                    <td className={`${bodyCellStyles} text-center`}>{index + 1}</td>
                                    <td className={`${bodyCellStyles} text-center`}>{i.college_rollno}</td>
                                    <td className={`${bodyCellStyles} text-left`}>{i.name}</td>
                                    <td className={`${bodyCellStyles} text-center`}>
                                        {i.attendance === 'Present' ? (
                                            <span style={{ color: 'green' }}>Present</span>
                                        ) : i.attendance === 'Leave' ? (
                                            <span style={{ color: 'blue' }}>Leave</span>
                                        ) : (
                                            <span style={{ color: 'red' }}>Absent</span>
                                        )}
                                    </td>
                                    <td className={`${bodyCellStyles} text-center`}>{i.university_rollno}</td>
                                    <td className={`${bodyCellStyles} text-left`}>{i.phone_number}</td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default ClassAttendanceView
