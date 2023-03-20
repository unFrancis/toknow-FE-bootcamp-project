import React, { useEffect, useState } from 'react'
import Link from 'next/link'
//components
import Layout from '../../components/Layout'
import CardAnnouncement from '../../components/CardAnnouncement'
import ArrowGoBack from '../../components/ArrowGoBack/ArrowGoBack'
//toastify imports
import { ToastContainer } from 'react-toastify'
import useToastify from '../../components/useToastify'
//icons
import { BsArrowRightCircle } from 'react-icons/bs';
import {BsPlusCircle } from 'react-icons/bs';

export default function Announcements() {

    const [announceInfo, setAnnounceInfo] = useState([])
    const notifySuccess = useToastify("success", "¡Anuncio creado con éxito!")

    //check de item que viene desde newAnnouncement para notificación de anuncio creado
    useEffect(() => {
        const notifAnnounceCreation = localStorage.getItem('notifAnnounceCreation')
        if (notifAnnounceCreation === "true") {
            notifySuccess()
            localStorage.setItem('notifAnnounceCreation', 'false')
        }

    }, [])

    //petición a la api para setear anuncios
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = JSON.parse(atob(token.split(".")[1]));
        console.log('the user data',userData)
        const userSchoolId = userData.schoolId._id
        console.log('the school',userSchoolId)
        if (token) {

            fetch(`https://api.toknow.online/announcement/school/${userSchoolId}`, {
                mode: "cors",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log("data de announcementt/school/id",data)
                    const allAnnouncements = data.data.announcement
                    console.log("anuncios", allAnnouncements)
                    setAnnounceInfo(allAnnouncements.reverse())
                })
        }
    }, []);
    return (
        <Layout>
            <div>

                <div className="d-flex mt-3 justify-content-center col-12 col-lg-12" >
                    <div className='d-flex col-11 col-lg-8 justify-content-between align-items-center'>
                        <div className='d-flex col-9 align-items-center'>
                            <h4>Anuncios escolares </h4>
                            <Link href={"/announcements/newannouncement"}>
                                <button className='btn-form bg-success'>Anuncio <BsPlusCircle/></button>
                            </Link>
                        </div>
                        <Link href={"/grouplist"} className="arrow-go-back d-flex align-items-center">
                            <BsArrowRightCircle />
                        </Link>

                    </div>
                </div>
                {announceInfo.map(announce => (
                    <Link href="/announcements/[announceId]"
                        as={`/announcements/${announce._id}`} key={announce.key} >

                        <CardAnnouncement
                            coverimg={"/img/kid&parent.jpeg"}
                            userName={announce.user.name}
                            role={announce.user.role}
                            date={"--fecha--"}
                            announcementTitle={announce.announcementTitle} />
                    </Link>
                ))}

            </div>
            <ToastContainer />
        </Layout>
    )
}
