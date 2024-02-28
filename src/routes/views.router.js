const express = require("express");
const router = express.Router();

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realtimeproducts");
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

// RUTA PARA EL FORMULARIO DE LOGIN
router.get("/login", (req, res) => {
  if (req.session.login) {
    return res.redirect("/profile")
  }

  res.render("login")
})

module.exports = router;

//RUTA PARA EL FORMULARIO DE REGISTRO
router.get("/register", (req, res) => {
  if (req.session.login) {
    return res.redirect("/profile");
  }

  res.render("register")
})

// RUTA PARA EL PERFIIL
router.get("/profile", (req, res) => {
  if (!req.session.login) {
    return res.redirect("/login")
  }

  res.render("profile", {user: req.session.user})
})

module.exports = router;