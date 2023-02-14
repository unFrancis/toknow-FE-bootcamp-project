import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import 'bootstrap/dist/css/bootstrap.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ArrowGoBack from '../ArrowGoBack/ArrowGoBack'

export default function FormTeacher() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()
    const groupId = router.query.groupId
    const [schoolId, setSchoolId] = useState({})

    useEffect(() => {

        const token = localStorage.getItem('token')
        fetch(`https://api.toknow.online/group/${groupId}`, {
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .then(data => {
                if (data.data) {
                    setSchoolId(data.data.groupById.school._id)
                }

                // console.log("soy la data.data OJO AQUÍ", data.data.school._id)
                // console.log("soy la data.data.groupById.teachers", data.data.groupById.teachers)

            })
    }, [router.query])
    console.log("Soy SchoolId", schoolId)
    const schoolIdStr = schoolId.toString()
    console.log('soy string :3', schoolIdStr)
    // console.log("soy el routerquery groupId", groupId)


    const onSubmit = async data => {

        const token = localStorage.getItem('token')
        let result = await fetch('https://api.toknow.online/teacher', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(
                data
            )
        })
        const teacherInfo = await result.json()

        const resultUserTeacher = await fetch('https://api.toknow.online/user', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(
                data
            )
        })
        const userTeacher = await resultUserTeacher.json()


        console.log('info /teach', teacherInfo)
        console.log('teach /user', userTeacher)
        if (teacherInfo.success === true) {
            router.push(`/grouplist/${groupId}`)
        } else {
            (window.alert("Hubo un problema al envíar la información"))
        }

    }
    // console.log("soy el groupId en formTeacher", groupId)


    return (

        <div className='d-flex flex-column align-items-center col-12 justify-content-center '>
            <ArrowGoBack
                btnTxtModal={<h4>Datos del profesor</h4>}
                route={`/grouplist/${groupId}`} />
            <form onSubmit={handleSubmit(onSubmit)} className='d-flex mt-3 col-10 flex-column align-items-center justify-content-center'>
                <div className='col-10 d-flex flex-wrap justify-content-around'>

                    <div className='d-flex col-5 flex-column'>
                        <div className="form-floating mb-3">
                            <input
                                name='name'
                                className="form-control"
                                placeholder='Nombre'
                                {...register("name", { required: true, minLength: 2, maxLength: 20 })} ></input>
                            {errors.name && errors.name.type === "required" && <span className='text-danger'>*El campo es requerido.</span>}
                            {errors.name && errors.name.type === "minLength" && <span className='text-danger'>*El campo requiere al menos 2 caracteres</span>}
                            {errors.name && errors.name.type === "maxLength" && <span className='text-danger'>*El campo requiere menos de 21 caracteres</span>}
                            <label>Nombre</label>
                        </div>
                    </div>

                    <div className='d-flex col-5 flex-column'>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                name='email'
                                className="form-control"
                                placeholder='Correo'
                                {...register("email", { required: true })} ></input>
                            {errors.email && errors.email.type === "required" && <span className='text-danger'>*El campo es requerido</span>}
                            <label>Correo</label>
                        </div>
                    </div>

                    <div className='d-flex col-5 flex-column'>
                        <div className="form-floating mb-3">
                            <input
                                name='lastNameA'
                                className="form-control"
                                placeholder='Apellido Paterno'
                                {...register("lastNameA", { required: true, minLength: 2, maxLength: 20 })} ></input>
                            {errors.lastNameA && errors.lastNameA.type === "required" && <span className='text-danger'>*El campo es requerido.</span>}
                            {errors.lastNameA && errors.lastNameA.type === "minLength" && <span className='text-danger'>*El campo requiere al menos 2 caracteres</span>}
                            {errors.lastNameA && errors.lastNameA.type === "maxLength" && <span className='text-danger'>*El campo requiere menos de 21 caracteres</span>}
                            <label>Apellido Paterno</label>
                        </div>
                    </div>

                    <div className='d-flex col-5 flex-column '>
                        <div className="form-floating mb-3">
                            <input
                                type='number'
                                name='phone'
                                className="form-control"
                                placeholder='Teléfono'
                                {...register("phone")} ></input>
                            <label>Teléfono</label>
                        </div>
                    </div>

                    <div className='d-flex col-5 flex-column'>
                        <div className="form-floating mb-3">
                            <input
                                name='lastNameB'
                                className="form-control"
                                placeholder='Apellido Materno'
                                {...register("lastNameB", { required: true, minLength: 2, maxLength: 20 })} ></input>
                            {errors.lastNameB && errors.lastNameB.type === "required" && <span className='text-danger'>*El campo es requerido.</span>}
                            {errors.lastNameB && errors.lastNameB.type === "minLength" && <span className='text-danger'>*El campo requiere al menos 2 caracteres</span>}
                            {errors.lastNameB && errors.lastNameB.type === "maxLength" && <span className='text-danger'>*El campo requiere menos de 21 caracteres</span>}
                            <label>Apellido Materno</label>
                        </div>
                    </div>

                    {/* <div className='d-flex col-5 flex-column'>
                        <div className="form-floating mb-3">
                            <input
                                name='matricula'
                                className="form-control"
                                placeholder='Matrícula'
                                {...register("matricula")} ></input>
                            <label>Matrícula</label>
                        </div>
                    </div> */}



                    {/* <div className='d-flex col-5 flex-column'>
                        
                        <div className="form-floating mb-3">
                            <input
                                type='number'
                                name='dateOfBirth'
                                className="form-control"
                                placeholder='Ej. 24011996'
                                {...register("dateOfBirth")} ></input>
                            <label>Fecha nacimiento</label>
                        </div>
                    </div> */}

                    <div className='d-flex col-5 flex-column'>
                        {/* tiene que cumplir uno de la lista en el back.*/}
                        <div className="form-floating mb-3">
                            <select
                                name='tipoProfesor'
                                className="form-control form-select"
                                {...register("tipoProfesor", { required: true })}>
                                <option value="">Materia</option>
                                <option value="titular">Titular</option>
                                <option value="educacion fisica">Educación física</option>
                                <option value="ingles">Inglés</option>
                            </select>
                            {errors.tipoProfesor && errors.tipoProfesor.type === "required" && <span className='text-danger'>*Selecciona el tipo de profesor</span>}
                            <label>Tipo de profesor</label>
                        </div>
                    </div>

                    {/* <div className='d-flex col-5 flex-column'>
                        <div className="form-floating mb-3">
                            <input
                                name='bio'
                                className="form-control"
                                placeholder='Bio'
                                {...register("bio")} ></input>
                            <label>Bio</label>
                        </div>
                    </div> */}

                    <div className='d-none d-flex col-5 flex-column'>
                        <div className="form-floating mb-3">
                            <select
                                name='role'
                                className="form-control form-select"
                                {...register("role", { required: true })} >
                                <option value="teacher">Profesor</option>
                            </select>
                            {errors.grade && errors.grade.type === "required" && <span className='text-danger'>*Selecciona un rol</span>}
                            <label>Rol</label>
                        </div>
                    </div>

                    <div className='d-flex col-5 flex-column'>
                        <div className="form-floating mb-3">
                            <input
                                name='password'
                                type='password'
                                className="form-control"
                                placeholder='Contraseña'
                                {...register("password", { required: true, minLength: 3, maxLength: 20 })} ></input>
                            {errors.password && errors.password.type === "required" && <span className='text-danger'>*El campo es requerido.</span>}
                            {errors.password && errors.password.type === "minLength" && <span className='text-danger'>*El campo requiere al menos 3 caracteres</span>}
                            {errors.password && errors.password.type === "maxLength" && <span className='text-danger'>*El campo requiere menos de 21 caracteres</span>}
                            <label>Contraseña</label>
                        </div>
                    </div>

                    {/* campo escondido con d-none pero necesario para tomar id de grupo y enviarlo
                    en formulario del teacher */}
                    <div className=' d-flex col-5 flex-column'>
                        <div className="form-floating mb-3">
                            <select
                                name='groups'
                                className="form-control form-select"
                                {...register("groups")} >
                                <option value={groupId}></option>

                            </select>
                            <label>aqui va el group ID</label>
                        </div>
                    </div>

                    {/* campo escondido con d-none pero necesario para tomar id de SCHOOL y 
                        QUE EL TEACHER DE RUTA API /USER tenga escuela a la que acceder  */}
                    <div className=' d-flex col-5 flex-column'>
                        <div className="form-floating mb-3">
                            <select
                                name='school'
                                className="form-control form-select"
                                {...register("school")} >
                                <option value={schoolIdStr}></option>
                            </select>
                            <label>aqui va el school ID</label>
                        </div>
                    </div>



                </div>

                <div className='d-flex col-lg-4 justify-content-around'>
                    <button className='btn-form' type='submit'>Registrar</button>
                </div>

            </form>
        </div>
    )
}
