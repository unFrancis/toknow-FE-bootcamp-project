import React, { useEffect } from 'react'
import FormParent from '../../../../../../components/FormParent/formParent';
import Layout from '../../../../../../components/Layout'
import { useRouter } from 'next/router'

export default function Index() {

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.replace("/")
            return
        }
    })

    return (
        <Layout>
            <div className=''>
                <FormParent />
            </div>
        </Layout>
    )
}