const express = require("express");
const router = express.Router();
const CartManager = require("../dao/db/cart-manager-db.js");
const CartModel = require("../dao/models/cart.model.js");
const cartManager = new CartManager();

//Routes:

router.post("/", async (req, res) => {
  try {
    const nuevoCarrito = await cartManager.crearCarrito();
    res.json(nuevoCarrito);
  } catch (error) {
    console.error("Error al crear un nuevo carrito", error);
    res.status(500).json({ error: "Error intero del servidor" });
  }
});

router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const carrito = await cartManager.getCarritoById(cartId);
    res.json(carrito.products);
  } catch (error) {
    console.error("Error al obtener el carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const actualizarCarrito = await cartManager.agregarProductoAlCarrito(
      cartId,
      productId,
      quantity
    );
    res.json(actualizarCarrito.products);
  } catch (error) {
    console.error("Error al agregar producto al carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//ELIMINAR PRODUCTO DEL CARRITO

router.delete("/:cid/products/:pid", async (req, res) => {
  const cartSelected = req.params.cid;
  const productSelected = req.params.pid;

  try {
    const actualizarCarrito = await cartManager.deleteProduct(
      cartSelected,
      productSelected
    );
    res.json(actualizarCarrito);
  } catch (error) {
    console.error("Error al eliminar producto del carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//ACTUALIZAR CARRITO CON NUEVOS PRODUCTOS

router.put("/:cid", async (req, res) => {
    try {
      const cartSelected = req.params.cid;
      const newProducts = req.body;
      console.log(newProducts)
      const actualizarCarrito = await cartManager.updateCart(
        cartSelected,
        newProducts
      );
      res.json(actualizarCarrito);
    } catch (error) {
      console.error("Error al agregar producto al carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
});

//ACTUALIZAR PRODUCTO DEL CARRITO

router.put("/:cid/products/:pid", async (req, res) => {
  const cartSelected = req.params.cid;
  const productSelected = req.params.pid;
  const quantity = req.body.quantity;

  try {
    actualizarCarrito = await cartManager.updateCartQuantity(
      cartSelected,
      productSelected,
      quantity
    );
    res.json(actualizarCarrito);
  } catch (error) {
    console.error("Error al actualizar el producto del carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO

router.delete("/:cid", async (req, res) => {
  const cartSelected = req.params.cid;

  try {
    deleteProduct = await cartManager.deleteProductCart(cartSelected);
    res.json(deleteProduct);
  } catch (error) {
    onsole.error("Error al eliminar los productos", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
