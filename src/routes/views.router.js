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

router.get("/carts/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
     const carrito = await cartManager.getCarritoById(cartId);

     if (!carrito) {
        console.log("No existe ese carrito con el id");
        return res.status(404).json({ error: "Carrito no encontrado" });
     }

     const productosEnCarrito = carrito.products.map(item => ({
        product: item.product.toObject(),
        //Lo convertimos a objeto para pasar las restricciones de Exp Handlebars. 
        quantity: item.quantity
     }));


     res.render("carts", { productos: productosEnCarrito });
  } catch (error) {
     console.error("Error al obtener el carrito", error);
     res.status(500).json({ error: "Error interno del servidor" });
  }
});

// RUTA PARA EL FORMULARIO DE LOGIN
router.get("/", (req, res) => {
  if (req.session.login) {
    return res.redirect("/profile")
  }
  res.render("login", {
    style: "login.css"
  });
});

module.exports = router;

//RUTA PARA EL FORMULARIO DE REGISTRO
router.get("/register", (req, res) => {
  if (req.session.login) {
    return res.redirect("/profile");
  }

  res.render("register");
});

// RUTA PARA EL PERFIIL
router.get("/profile", (req, res) => {
  if (!req.session.login) {
    return res.redirect("/")
  }

  res.render("profile", {user: req.session.user});
});
 
module.exports = router;
