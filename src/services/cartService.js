const CartModel = require("../models/cart.model.js");

class CartService {
  //Crear carrito
  async crearCarrito() {
    try {
      const nuevoCarrito = new CartModel({ products: [] });
      await nuevoCarrito.save();
      return nuevoCarrito;
    } catch (error) {
      console.log("Error al crear un nuevo carrito");
    }
  }

  //Obtener carrito por id
  async getCarritoById(cartId) {
    try {
      const carrito = await CartModel.findById(cartId);
      if (!carrito) {
        console.log("No existe ese carrito con el id seleccionado");
        return null;
      }
      return carrito;
    } catch (error) {
      console.log("Error al traer el carrito", error);
    }
  }

  //Agregar producto al carrito
  async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
    try {
      const carrito = await this.getCarritoById(cartId);
      const existeProducto = carrito.products.find(
        (item) => item.product.toString() === productId
      );

      if (existeProducto) {
        existeProducto.quantity += quantity;
      } else {
        carrito.products.push({ product: productId, quantity });
      }

      //Marcamos la propiedad products como modificada antes de guardar:
      carrito.markModified("products");

      await carrito.save();
      return carrito;
    } catch (error) {
      console.log("error al agregar un producto", error);
    }
  }

  //Eliminamos el producto del carrito
  async deleteProduct(cartId, productId) {
    try {
      const cartSelected = await this.getCarritoById(cartId);

      //Verificamos que el carrito exista:
      if (!cartSelected) {
        console.log("No se encontró el carrito");
        return null;
      }

      const productIndex = cartSelected.products.findIndex(
        (product) => product.product.toString() === productId
      );

      //Verificamos que el producto exista:
      if (productIndex === -1) {
        console.log("No se encontró el producto en el carrito");
        return null;
      }

      cartSelected.products.splice(productIndex, 1);

      await cartSelected.save();

      console.log("Producto eliminado correctamente");

      return cartSelected;
    } catch (error) {
      console.log("Error al eliminar el producto ", error);
      throw error;
    }
  }

  //Actualizamos el carrito
  async updateCart(cartId, newProducts) {
    try {
      const cartSelected = await this.getCarritoById(cartId);

      //Verificamos que el carrito exista:
      if (!cartSelected) {
        console.log("No se encontró el carrito");
        return null;
      }

      newProducts.forEach((newProduct) => {
        cartSelected.products.push(newProduct);
      });

      await cartSelected.save();

      console.log("Carrito actualizado con éxito");
      return cartSelected;
    } catch (error) {
      console.log("Error al actualizar el carrito ", error);
      throw error;
    }
  }

  //Actualizamos el producto del carrito
  async updateCartQuantity(cartId, productId, quantity) {
    try {
      const cartSelected = await this.getCarritoById(cartId);

      //Verificamos que el carrito exista:
      if (!cartSelected) {
        console.log("No se encontró el carrito");
        return null;
      }

      const productIndex = cartSelected.products.findIndex(
        (product) => product.product.toString() === productId
      );

      //Verificamos que el producto exista:
      if (productIndex === -1) {
        console.log("No se encontró el producto en el carrito");
        return null;
      }

      cartSelected.products[productIndex].quantity = quantity;

      await cartSelected.save();
      console.log("Cantidad del producto actualizada con éxito");
      return cartSelected;
    } catch (error) {
      console.log("Error al actualizar el carrito ", error);
      throw error;
    }
  }

  //Eliminar todos los productos del carrito
  async deleteProductCart(cartId) {
    try {
      const cartSelected = await CartModel.findByIdAndUpdate(
        cartId,
        { products: [] },
        { new: true }
      );

      //Verificamos que el carrito exista:
      if (!cartSelected) {
        throw new Error("Carrito no encontrado");
      }

      console.log("Todos los productos fueron eliminados con éxito");
      return cartSelected;
    } catch (error) {
      console.log("Error al eliminar los productos del carrito", error);
      throw error;
    }
  }
}

module.exports = CartService;
