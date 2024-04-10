const express = require("express");
const router = express.Router();
const passport = require("passport");

const UserController = require("../controllers/userController.js")
const userController = new UserController()

///////// Versión con passport /////////

router.post(
  "/",
  passport.authenticate("login", {
    failureRedirect: "faillogin",
  }), userController.login
);

router.get("/faillogin", userController.faillogin);

router.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/failedregister" }),
  userController.register
);

router.get("/failedregister", (req, res) => {
  res.send({ error: "Registro fallido" });
});

router.get("/logout", userController.logout);

//Versión para GITHUB:
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/" }),
  userController.registerGithub
);

module.exports = router;
