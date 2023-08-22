import React from 'react'
import { FaBan } from 'react-icons/fa'

const NotApproved = ({ title }) => {
    return (
        <div className='red-primary h-screen pt-10' >
            <div className='h-full w-full flex justify-center items-center align-middle'>
                <FaBan className='lg:text-4xl md:text-3xl text-2xl mr-3 text-red-800' />
                <span className='lg:text-4xl md:text-3xl text-2xl'>
                    You are {title} by Admin
                </span>
            </div>
        </div>
    )
}

export default NotApproved
