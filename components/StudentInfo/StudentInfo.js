import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import TeacherRectangle from '../teacherRectangle/TeacherRectangle'

export default function StudentInfo({ student }) {
    const { name, lastNameA, lastNameB, matricula } = student
    const router = useRouter()
    const studentId = router.query.studentId
    const groupId = router.query.groupId
    const [parents, setParents] = useState([])
    const [userRole, setUserRole] = useState('')

    useEffect(() => {

        const token = localStorage.getItem('token')
        if (token) {
            const userData = JSON.parse(atob(token.split(".")[1]));
            setUserRole(userData.role)
            fetch(`https://api.toknow.online/student/${studentId}`, {
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            })
                .then((response) => response.json())
                .then(data => {
                    if (data.data) {
                        setParents(data.data.studentById.parents)
                    }
                })
        }
    }, [])

    const handleEyeClick = (groupId, student, strRutaExtra, userId) => {
        const route = (`/grouplist/${groupId}/${student}/${strRutaExtra}/${userId}`)
        router.push(route)
    }

    const handleTrashClick = (strRoute, parentId) => {
        const token = localStorage.getItem("token")
        fetch(`https://api.toknow.online/${strRoute}/${parentId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok === true) {
                    window.location.reload()
                }
            })
    };

    return (

        <div className='d-flex justify-content-center col-12'>

            <div className='d-flex mt-3 col-10 flex-column align-items-center justify-content-center'>

                <div className='col-10 flex-column flex-lg-row d-flex flex-wrap justify-content-around'>

                    <div className='d-flex col-lg-5 flex-column'>
                        <div className="form-floating mb-3">
                            <span
                                name='name'
                                className="form-control"
                                placeholder='Nombre'
                            >{name}</span>

                            <label>Nombre</label>
                        </div>
                    </div>

                    <div className='d-flex col-lg-5 flex-column'>
                        <div className="form-floating mb-3">
                            <span
                                name='lastNameA'
                                className="form-control"
                                placeholder='Apellido Paterno'
                            >{lastNameA}</span>

                            <label>Apellido Paterno</label>
                        </div>
                    </div>

                    <div className='d-flex col-lg-5 flex-column'>
                        <div className="form-floating mb-3">
                            <span
                                name='lastNameB'
                                className="form-control"
                                placeholder='Apellido Materno'
                            >{lastNameB}</span>

                            <label>Apellido Materno</label>
                        </div>
                    </div>

                    <div className='d-flex col-lg-5 flex-column'>
                        <div className="form-floating mb-3">
                            <span
                                name='matricula'
                                className="form-control"
                                placeholder='Matrícula'
                            >{matricula}</span>
                            <label>Matrícula</label>
                        </div>
                    </div>
                </div>

                <div className='d-flex col-12 col-lg-10 justify-content-around'>

                    <div className='d-flex col-12 col-lg-7 flex-column align-items-center justify-content-center'>
                        <h4>Datos del tutor</h4>
                        {(parents.length) ?
                            parents.map(parent => {
                                return (
                                    <TeacherRectangle
                                        key={parent._id}
                                        userId={parent._id}
                                        name={parent.name}
                                        lastNameA={parent.lastNameA}
                                        lastNameB={parent.lastNameB}
                                        tipoProfesor={parent.tipoProfesor}
                                        onEyeClick={() => handleEyeClick(groupId, studentId, "parent", parent._id)}
                                        onTrashClick={() => handleTrashClick("parent", parent._id)}
                                    />
                                )
                            }) : <div className='d-flex flex-column align-items-center'>
                                <p>Aún no hay un tutor registrado.  </p>
                                {(userRole == "admin") ?
                                    <p><Link href="/grouplist/[groupId]/[studentId]/parent/addparent"
                                        as={`/grouplist/${groupId}/${studentId}/parent/addparent`}>
                                        <button className='btn-form'>Registrar tutor</button> </Link> </p> : <p></p>
                                }
                            </div>
                        }
                    </div>
                </div>



            </div>
        </div>
    )
}
