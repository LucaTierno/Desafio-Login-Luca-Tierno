// Bcrypt es una librería de hashing de constraseña
//1) Instalamos: npm install bcrypt
//2) Importamos el módulo:

const bcrypt = require("bcrypt");

// Se crearan dos funciones:
//a) createHash: aplicar el hash al password.
//b) isValidPassword: compara el password proporcionado por la base de datos.

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//hashSync: toma el password que le pasamos y aplica el proceso de hasheo a aprtir de un salt.

//Un "salt" es un string random que hace que el proceso de hasheo se realice de forma impredecible.

//genSaltSync(10): generara un salt de 10 caracteres.
//ESTE PROCESO ES IRREVERSIBLE.

const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

//Comparar los password, retorna true o false según corresponda.

module.exports = {
    createHash,
    isValidPassword
}