const ProductModel = require("../models/product.model.js");

class ProductRepository {
  //Crear producto
  async addProduct(nuevoObjeto) {
    try {
      let { title, description, code, price, status, stock, category } =
        nuevoObjeto;

      if (
        !title ||
        !description ||
        !code ||
        !price ||
        !status ||
        !stock ||
        !category
      ) {
        console.log(
          "Todos los campos son obligatorios. Por favor ingresar todos."
        );
        return;
      }

      const existeProducto = await ProductModel.findOne({ code: code });

      if (existeProducto) {
        console.log("El código debe ser unico");
        return;
      }

      const newProduct = new ProductModel({
        title,
        description,
        price,
        img: "Sin imagen",
        code,
        stock,
        category,
        status: true,
        thumbnails: true,
      });

      await newProduct.save();
    } catch (error) {
      console.log("Error al agregar producto", error);
      throw error;
    }
  }

  //Obetener todos los productos
  async getProducts() {
    try {
      const productos = await ProductModel.find();
      return productos;
    } catch (error) {
      console.log("Error al obtener los productos", error);
    }
  }

  //Buscar producto por ID
  async getProductsById(id) {
    try {
      const producto = await ProductModel.findById(id);

      if (!producto) {
        console.log("Producto no encontrado");
        return null;
      }

      console.log("Producto encontrado");
      return producto;
    } catch (error) {
      console.log("Error al traer un producto por id");
    }
  }

  //Alctualizar producto por ID
  async updateProduct(id, productoActualizado) {
    try {
      const updateado = await ProductModel.findByIdAndUpdate(
        id,
        productoActualizado
      );

      if (!updateado) {
        console.log("No se encontro el producto");
        return null;
      }

      console.log("Producto actualizado con exito");
      return updateado;
    } catch (error) {
      console.log("Error al actualizar el producto ", error);
    }
  }

  //Eliminamos producto por ID
  async deleteProduct(id) {
    try {
      const deleteado = await ProductModel.findByIdAndDelete(id);

      if (!deleteado) {
        console.log("No se encontro el producto");
        return null;
      }

      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.log("Error al eliminar el producto ", error);
      throw error;
    }
  }
}

module.exports = ProductRepository;
