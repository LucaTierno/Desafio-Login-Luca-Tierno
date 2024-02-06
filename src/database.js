//Hacemos la conexion con MONGODB

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://lucatierno:luE8JYX4cFxxYnCa@luca.9uzn73g.mongodb.net/ecommerce?retryWrites=true&w=majority"
  )
  .then(() => console.log("Conexión exitosa"))
  .catch(() => console.log("Error de conexión"));
