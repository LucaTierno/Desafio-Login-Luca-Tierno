const express = require("express");
const router = express.Router();
const UserModel = require("../dao/models/user.model");
const { isValidPassword } = require("../utils/hashBcrypt");
const passport = require("passport");

//Login
/*
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await UserModel.findOne({ email: email });
    if (usuario) {
      if (isValidPassword(password, usuario)) {
        req.session.login = true;
        req.session.user = {
          email: usuario.email,
          age: usuario.age,
          first_name: usuario.first_name,
          last_name: usuario.last_name,
        };

        res.redirect("/profile");
      } else {
        res.status(401).send({ error: "Contraseña incorrecta" });
      }
    } else {
      res.status(404).send({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(400).send({ error: " Error en el login" });
  }
});
*/

//////////////////////////////////
//Version con passport:

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "Error", message: "Credenciales invalidas" });

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };

    req.session.login = true;

    res.redirect("/profile");
  }
);

router.get("/faillogin", async (req, res) => {
  console.log("Fallo la estrategia");
  res.send({ error: "Error" });
});

//Logout

router.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
    //res.status(200).send({ message: "Sesion cerrada" }).
    res.redirect("/login");
  }
});

//Version para GITHUB:

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    //La estrategía de github nos retornara el usuario, entonces lo agregamos a nuestro objeto de sesion.
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/profile"); 
  }
);

module.exports = router;
