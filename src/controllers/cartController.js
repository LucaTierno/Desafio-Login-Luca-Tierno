const CartModel = require("../models/cart.model.js");
const CartService = require("../services/cartService.js");
const cartService = new CartService();

class CartController {
  //Crear carrito
  async crearCarrito() {
    try {
      const nuevoCarrito = await cartService.crearCarrito();
      res.json(nuevoCarrito);
    } catch (error) {
      console.error("Error al crear un nuevo carrito", error);
      res.status(500).json({ error: "Error intero del servidor" });
    }
  }

  //Obtener carrito por id
  async getCarritoById(req, res) {
    const cartId = req.params.cid;

    try {
      const carrito = await cartService.getCarritoById(cartId);
      res.json(carrito.products);
    } catch (error) {
      console.error("Error al obtener el carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  //Agregar producto al carrito
  async agregarProductoAlCarrito(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
      const actualizarCarrito = await cartService.agregarProductoAlCarrito(
        cartId,
        productId,
        quantity
      );
      res.json(actualizarCarrito.products);
    } catch (error) {
      console.error("Error al agregar producto al carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  //Eliminamos el producto del carrito
  async deleteProduct(req, res) {
    const cartSelected = req.params.cid;
    const productSelected = req.params.pid;

    try {
      const actualizarCarrito = await cartService.deleteProduct(
        cartSelected,
        productSelected
      );
      res.json({
        status: "success",
        message: "Producto eliminado del carrito",
        actualizarCarrito,
      });
    } catch (error) {
      console.error("Error al eliminar producto del carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  //Actualizamos el carrito
  async updateCart(req, res) {
    try {
      const cartSelected = req.params.cid;
      const newProducts = req.body;

      const actualizarCarrito = await cartService.updateCart(
        cartSelected,
        newProducts
      );
      res.json(actualizarCarrito);
    } catch (error) {
      console.error("Error al agregar producto al carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  //Actualizamos el producto del carrito
  async updateCartQuantity(req, res) {
    const cartSelected = req.params.cid;
    const productSelected = req.params.pid;
    const quantity = req.body.quantity;

    try {
      actualizarCarrito = await cartService.updateCartQuantity(
        cartSelected,
        productSelected,
        quantity
      );
      res.json({
        status: "success",
        message: "Cantidad del producto actualizada correctamente",
        actualizarCarrito,
      });
    } catch (error) {
      console.error("Error al actualizar el producto del carrito", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  //Eliminar todos los productos del carrito
  async deleteProductCart(req, res) {
    const cartSelected = req.params.cid;

    try {
      deleteProduct = await cartService.deleteProductCart(cartSelected);
      res.json({
        status: "success",
        message:
          "Todos los productos del carrito fueron eliminados correctamente",
        deleteProduct,
      });
    } catch (error) {
      onsole.error("Error al eliminar los productos", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = CartController;
