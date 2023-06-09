import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import 'bootstrap/dist/css/bootstrap.css'
import { useRouter } from 'next/router'
import ArrowGoBack from '../ArrowGoBack/ArrowGoBack'
//toastify imports
import { ToastContainer } from 'react-toastify'
import useToastify from '../useToastify'

export default function FormParent() {
    const { register, handleSubmit, formState: { errors }, setError, formState } = useForm()
    const router = useRouter()
    const studentId = router.query.studentId
    const groupId = router.query.groupId
    const notifyError = useToastify("error", "Hubo un problema al envíar la información")
    const [studentName, setStudentName] = useState("")
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch(`https://api.toknow.online/student/${studentId}`,{
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => response.json() )
        .then(data => {
            if(data.data){
                const parentStudent = data.data.studentById
                setStudentName(`${parentStudent.name} ${parentStudent.lastNameA} ${parentStudent.lastNameB}`)
            }
        })
    })

    const onSubmit = async data => {
        const token = localStorage.getItem('token')

        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", {
                type: "passwordMismatch",
                message: "*Las contraseñas no coinciden"
            });
            return;
        }
        
        let result = await fetch('https://api.toknow.online/parent', {
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
        const parentInfo = await result.json()

        const joy = await fetch("/api/sendgrid", {
            body: JSON.stringify({
              email: data.email,
              fullname: data.name,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          });

        if (parentInfo.success === true) {
            router.push(`/grouplist/${groupId}/${studentId}`)
        } else {
            notifyError()
        }

    }


    return (

        <div className='d-flex flex-column align-items-center col-12 justify-content-center '>
            <ArrowGoBack
                btnTxtModal={<h4>Datos del Tutor de {studentName}</h4>}
                route={`/grouplist/${groupId}/${studentId}`} />
            <form onSubmit={handleSubmit(onSubmit)} className='d-flex mt-3 col-lg-10 flex-column align-items-center justify-content-center'>
                <div className='col-10 d-flex flex-wrap justify-content-around'>

                    
                        <div className='d-flex col-10 col-lg-5 flex-column'>
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

                        <div className='d-flex col-10 col-lg-5 flex-column'>
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

                        <div className='d-flex col-10 col-lg-5 flex-column'>
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
                    
                        <div className='d-flex col-10 col-lg-5 flex-column'>
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

                        <div className='d-flex col-10 col-lg-5 flex-column'>
                            <div className="form-floating mb-3">
                                <input
                                    type='number'
                                    name='phone'
                                    className="form-control"
                                    placeholder='Teléfono'
                                    {...register("phone", { required: true })} ></input>
                                    {errors.phone && errors.phone.type === "required" && <span className='text-danger'>*El campo es requerido</span>

                                    }
                                <label>Teléfono</label>
                            </div>
                        </div>

                        <div className='d-flex col-10 col-lg-5 flex-column'>
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
                    

                    <div className='d-flex col-10 col-lg-5 flex-column'>
                        <div className="form-floating mb-3">
                            <input
                                type='password'
                                name='confirmPassword'
                                className="form-control"
                                placeholder='Confirme su contraseña'
                                {...register("confirmPassword", { required: true, minLength: 3, maxLength: 30 })} >
                            </input>
                            {errors.confirmPassword && errors.confirmPassword.type === "required" && <span className='text-danger'>*El campo es requerido.</span>}
                            {errors.confirmPassword && errors.confirmPassword.type === "minLength" && <span className='text-danger'>*El campo requiere más de 3 caracteres.</span>}
                            {errors.confirmPassword && errors.confirmPassword.type === "maxLength" && <span className='text-danger'>*El campo requiere menos de 31 caracteres.</span>}
                            {errors.confirmPassword && errors.confirmPassword.type === "passwordMismatch" && <span className='text-danger'>{errors.confirmPassword.message}</span>}
                            <label>Confirme su contraseña</label>
                        </div>
                    </div>
                    {/* valor escondido */}
                    <div className='d-none d-flex col-5 flex-column'>
                        <div className="form-floating mb-3">
                            <select
                                name='role'
                                className="form-control form-select"
                                {...register("role", { required: true })} >
                                <option value="parent"></option>
                            </select>
                            {errors.grade && errors.grade.type === "required" && <span className='text-danger'>*Selecciona un rol</span>}
                            <label>Rol</label>
                        </div>
                    </div>

                    {/* campo escondido con d-none pero necesario para tomar id de student y enviarlo
                    en formulario del teacher */}
                    <div className='d-none d-flex col-5 flex-column'>
                        <div className="form-floating mb-3">
                            <select
                                name='students'
                                className="form-control form-select"
                                {...register("students")} >
                                <option value={studentId}></option>

                            </select>
                            {errors.students && errors.students.type === "required" && <span className='text-danger'>**studentId*</span>}
                            <label>aqui va el student ID</label>
                        </div>
                    </div>
                    {/* campo escondido con d-none pero necesario para tomar id de grupo y enviarlo
                    en formulario del teacher */}
                    <div className='d-none d-flex col-5 flex-column'>
                        <div className="form-floating mb-3">
                            <select
                                name='groups'
                                className="form-control form-select"
                                {...register("groups")} >
                                <option value={groupId}></option>

                            </select>
                            {errors.groups && errors.groups.type === "required" && <span className='text-danger'>**groupId**</span>}
                            <label>aqui va el group ID</label>
                        </div>
                    </div>

                </div>

                <div className='d-flex col-lg-4 justify-content-around'>
                    <button className='btn-form' type='submit' disabled={formState.isSubmitting}> Registrar </button>
                </div>

            </form>
            <ToastContainer/>
        </div>
    )
}
