const generarInfoError = (usuario) => {
    return `Los datos estan incompletos o no son válidos.
    Necesitamos recibir los siguientes datos:
    - Nombre: String, pero recibimos ${usuario.first_name}
    - Apellido: String, pero recibimos ${usuario.last_name}
    - Email: String, pero recibimos ${usuario.email}
    - Password: ${usuario.password}
    - Edad: Number, pero recibimos ${usuario.age}
    `
}

module.exports = {
    generarInfoError
}