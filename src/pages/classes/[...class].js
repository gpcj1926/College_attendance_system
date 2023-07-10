import Index from 'components/attedance_system/Dashboard/Index'
import { useRouter } from 'next/router';
import React from 'react'
import { useClass } from 'util/db';

const Class = () => {
    const route = useRouter();
    const id = route?.asPath?.split("/")?.[2];
    const { data: data } = useClass(id);
    return (
        <>
            <Index>
                <section className='pt-10 bg-red-100 h-screen'>
                    {data?.class_name}
                    {data?.teacher_name}
                    {data?.department}
                </section>
            </Index>
        </>
    )
}

export default Class
