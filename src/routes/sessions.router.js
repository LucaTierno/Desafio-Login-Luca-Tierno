const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model.js");
const { isValidPassword } = require("../utils/hashBcrypt");
const passport = require("passport");
const generateToken = require("../utils/jsonwebtoken");

// Versión con passport:

// Login
router.post(
  "/",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(401)
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
    res.redirect("/");
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
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    //La estrategía de github nos retornara el usuario, entonces lo agregamos a nuestro objeto de sesion.
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/");
  }
);

module.exports = router;
