const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cartController.js");
const CartModel = require("../models/cart.model.js");
const cartController = new CartController();

//Routes:

router.post("/", cartController.crearCarrito);

router.get("/:cid", cartController.getCarritoById);

router.post("/:cid/product/:pid", cartController.agregarProductoAlCarrito);

router.delete("/:cid/products/:pid", cartController.deleteProduct);

router.put("/:cid", cartController.updateCart);

router.put("/:cid/products/:pid", cartController.updateCartQuantity);

router.delete("/:cid", cartController.deleteProductCart);

module.exports = router;
