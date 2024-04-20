const generarInfoError = (usuario) => {
    return `Los datos estan incompletos o no son válidos.
    Necesitamos recibir los siguientes datos:
    - Nombre: String, pero recibimos ${usuario.nombre}
    - Apellido: String, pero recibimos ${usuario.apellido}
    - Email: String, pero recibimos ${usuario.email}
    `
}

module.exports = {
    generarInfoError
}