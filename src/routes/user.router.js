const express = require("express");
const router = express.Router();
const UserModel = require("../dao/models/user.model");
const { createHash } = require("../utils/hashBcrypt");
const passport = require("passport");

//Post para crear un usuario y guardarlo en MongoDB
/*
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
      password:createHash(password),
      age,
    });

    req.session.login = true;
    req.session.user = { ...newUser._doc };
    //res.status(200).send({ message: "Usuario creado con éxito" });
    res.redirect("/profile")
  } catch (error) {
    console.error("Error al crear usuario: ", error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
});
*/

////////////////////////////////////////
// Version para passport

router.post("/", passport.authenticate("register", {failureRedirect: "/failedregister"}), async (req, res) => {
  if(!req.user) return res.status(400).send({status: "Error", message: "Credenciales invalidas"});

  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email
  };

  req.session.login = true;

  res.redirect("/profile")
})

router.get("/failedregister", (req, res) => {
  res.send({error: "Registro fallido"})
})

module.exports = router;
