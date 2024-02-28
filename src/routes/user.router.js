const express = require("express");
const router = express.Router();
const UserModel = require("../dao/models/user.model");

//Post para crear un usuario y guardarlo en MongoDB

router.post("/", async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .send({ error: "El correo electrónico ya está registrado" });
    }

    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      password,
      age,
    });

    req.session.login = true;
    req.status(200).send({ message: "Usuario creado con éxito" });
  } catch (error) {
    console.error("Error al crear usuario: ", error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
});

module.exports = router;
