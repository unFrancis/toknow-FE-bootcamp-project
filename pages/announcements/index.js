import React, { useEffect, useState } from 'react'
import Link from 'next/link'
//components
import Layout from '../../components/Layout'
import CardAnnouncement from '../../components/CardAnnouncement'
import ArrowGoBack from '../../components/ArrowGoBack/ArrowGoBack'
//toastify imports
import { ToastContainer } from 'react-toastify'
import useToastify from '../../components/useToastify'

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
        if (token) {

            fetch(`https://api.toknow.online/announcement`, {
                mode: "cors",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const allAnnouncements = data.data.announcement
                    console.log("anuncios", allAnnouncements)
                    setAnnounceInfo(allAnnouncements)
                })
        }
    }, []);
    return (
        <Layout>
            <div>

                <div className="d-flex mt-4 justify-content-center col-12 col-lg-12" >
                    <div className='d-flex col-11 col-lg-10 justify-content-between align-items-baseline'>
                        <h4>Tablero de anuncios</h4>
                        <Link href={"/announcements/newannouncement"}>
                            <button className='btn-form bg-success'>Nuevo anuncio</button>
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
