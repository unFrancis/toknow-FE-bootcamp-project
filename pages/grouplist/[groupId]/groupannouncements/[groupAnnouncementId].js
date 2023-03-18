import React, { useEffect, useState } from 'react'
import ArrowGoBack from '../../../../components/ArrowGoBack/ArrowGoBack';
import Layout from '../../../../components/Layout';
import PostAnnouncement from '../../../../components/PostAnnouncement'
import { useRouter } from 'next/router';
import AllComments from '../../../../components/AllComments';
import CommentBox from '../../../../components/CommentBox';


export default function AnnouncementId() {
    const router = useRouter()
    const groupId = router.query.groupId
    const announceId = router.query.groupAnnouncementId
    console.log("ojo",announceId)
    const [announceInfo, setAnnounceInfo] = useState({})
    const [repliesInfo, setRepliesInfo] = useState([])

    //petición a la api para setear anuncios
    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch(`https://api.toknow.online/announcement/${announceId}`, {
            mode: "cors",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                // console.log("la data", data)
                if (data.data) {
                    const announcement = data.data.announcementById
                    console.log("anuncio dentro de grupos", announcement)
                    setAnnounceInfo(announcement)
                    const replies = announcement.replies
                    console.log("respuestas en anuncio", replies)
                    setRepliesInfo(replies)
                }
            })

    }, [router.query]);
    return (
        <Layout>
            <div>
                <div>
                    <ArrowGoBack
                        //agregar botón para ir al formulario de creación
                        btnTxtModal={<h4>Anuncio</h4>}
                        route={`/grouplist/${groupId}/groupannouncements/`} />

                    {!!announceInfo.user &&
                        <PostAnnouncement
                            coverimg={"/img/kid&parent.jpeg"}
                            userName={announceInfo.user.name}
                            role={announceInfo.user.role}
                            date={"17 de noviembre"}
                            announcementTitle={announceInfo.announcementTitle}
                            textInfo={announceInfo.announcementText}
                            component={<CommentBox />}
                            component2={repliesInfo.length > 0 &&
                                repliesInfo.map(reply => (
                                    <AllComments 
                                    textInfo={reply.message}
                                    />
                                ))}
                        />}
                </div>
            </div>
        </Layout>
    )
}