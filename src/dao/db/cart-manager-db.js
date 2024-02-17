const CartModel = require("../models/cart.model.js");
const ProductModel = require("../models/product.model.js");

class CartManager {
  async crearCarrito() {
    try {
      const nuevoCarrito = new CartModel({ products: [] });
      await nuevoCarrito.save();
      return nuevoCarrito;
    } catch (error) {
      console.log("Error al crear un nuevo carrito");
    }
  }

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

  //ELIMINAMOS EL PRODUCTO DEL CARRITO
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

  //ACTUALIZAMOS EL CARRITO CON NUEVOS PRODUCTOS
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

  //ACTUALIZAMOS EL PRODUCTO DEL CARRITO
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

  //ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
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

module.exports = CartManager;
