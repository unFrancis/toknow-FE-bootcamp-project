import React from 'react'

export default function TeacherInfo({ teacher }) {
    const { name, email, lastNameA, phone, lastNameB, matricula, dateOfBirth, tipoProfesor, bio, grade } = teacher
    return (

        <div className='d-flex col-12 flex-column justify-content-center align-items-center'>

            <form className='d-flex mt-3 col-lg-10 flex-column align-items-center justify-content-center'>
                <div className='col-10 d-flex flex-wrap justify-content-around'>

                    <div className='d-flex col-11 col-lg-5 flex-column'>
                        <div className="form-floating mb-3">
                            <span
                                name='name'
                                className="form-control"
                                placeholder='Nombre'
                            >{name}</span>

                            <label>Nombre</label>
                        </div>
                    </div>

                    <div className='d-flex col-11 col-lg-5 flex-column'>
                        <div className="form-floating mb-3">
                            <span
                                type="email"
                                name='email'
                                className="form-control"
                                placeholder='Correo'
                            >{email}</span>

                            <label>Correo</label>
                        </div>
                    </div>

                    <div className='d-flex col-11 col-lg-5 flex-column'>
                        <div className="form-floating mb-3">
                            <span
                                name='lastNameA'
                                className="form-control"
                                placeholder='Apellido Paterno'
                            >{lastNameA}</span>

                            <label>Apellido Paterno</label>
                        </div>
                    </div>

                    <div className='d-flex col-11 col-lg-5 flex-column'>
                        <div className="form-floating mb-3">
                            <span
                                name='lastNameB'
                                className="form-control"
                                placeholder='Apellido Materno'
                            >{lastNameB}</span>

                            <label>Apellido Materno</label>
                        </div>
                    </div>

                    <div className='d-flex col-11 col-lg-5 flex-column '>
                        <div className="form-floating mb-3">
                            <span
                                type='number'
                                name='phone'
                                className="form-control"
                                placeholder='Teléfono'
                            >{phone}</span>
                            <label>Teléfono</label>
                        </div>
                    </div>


                    <div className='d-flex col-11 col-lg-5 flex-column'>
                        {/* tiene que cumplir uno de la lista en el back. hacer con desplegable */}
                        <div className="form-floating mb-3">
                            <span
                                name='tipoProfesor'
                                className="form-control"
                            >{tipoProfesor}</span>

                            <label>Tipo de profesor</label>
                        </div>
                    </div>

                    <div className='d-none d-flex col-5 flex-column '>
                        <div className="form-floating mb-3">
                            <span
                                name='grade'
                                className="form-control"
                            >{grade}</span>

                            <label>Grado</label>
                        </div>
                    </div>


                </div>

            </form>
        </div>
    )
}
