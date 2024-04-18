const express = require("express");
const router = express.Router();
const passport = require("passport");

const UserController = require("../controllers/userController.js")
const userController = new UserController()

router.post("/register", userController.register);

router.post("/", userController.login);

router.get("/profile", passport.authenticate("jwt", { session: false }), userController.profile);

router.post("/logout", userController.logout.bind(userController));

router.get("/admin", passport.authenticate("jwt", { session: false }), userController.admin);

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
