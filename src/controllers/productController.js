const ProductModel = require("../models/product.model.js");
const ProductService = require("../services/productService.js");
const productService = new ProductService();

class ProductController {
  //Crear producto
  async addProduct(req, res) {
    try {
      const newProduct = await productService.addProduct(req.body);
      res.json(newProduct)
    } catch (error) {
      res.status(500).json({error: "Error en el servidor"})
    }
  }

  //Obetener todos los productos
  async getProducts(req, res) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sort = req.query.sort || null;
    const query = req.query.query || null;

    try {
      const listProduct = await ProductModel.paginate(
        {},
        { limit, page, sort, query }
      );

      const resultListProduct = listProduct.docs.map((product) => {
        const { _id, ...rest } = product.toObject();
        return rest;
      });

      res.render("products", {
        status: "success",
        payload: resultListProduct,
        product: resultListProduct,
        hasPrevPage: listProduct.hasPrevPage,
        hasNextPage: listProduct.hasNextPage,
        prevPage: listProduct.prevPage,
        nextPage: listProduct.nextPage,
        currentPage: listProduct.page,
        totalPages: listProduct.totalPages,
      });
    } catch (error) {
      console.log("Error en la paginacion", error);
      res.status(500).send("Error en el servidor");
    }
  }

  //Buscar producto por ID
  async getProductsById(req, res) {
    const id = req.params.pid;

    try {
      const producto = await productService.getProductsById(id);
      if (!producto) {
        return res.json({
          error: "Producto no encontrado",
        });
      }

      res.json(producto);
    } catch (error) {
      console.error("Error al obtener producto", error);
      res.status(500).json({
        error: "Error interno del servidor",
      });
    }
  }

  //Alctualizar producto por ID
  async updateProduct(req, res) {
    const id = req.params.pid;
    const productoActualizado = req.body;

    try {
      await productService.updateProduct(id, productoActualizado);
      res.json({
        message: "Producto actualizado exitosamente",
      });
    } catch (error) {
      console.error("Error al actualizar producto", error);
      res.status(500).json({
        error: "Error interno del servidor",
      });
    }
  }

  //Eliminamos producto por ID
  async deleteProduct(req, res) {
    const id = req.params.pid;

    try {
      await productService.deleteProduct(id);
      res.status(201).json({
        message: "Producto eliminado exitosamente",
      });
    } catch (error) {
      console.log("Error al eliminar producto", error);
      res.status(500).json({
        error: "Error interno del servidor",
      });
    }
  }
}

module.exports = ProductController;
