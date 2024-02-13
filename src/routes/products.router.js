const express = require("express");
const router = express.Router();

const ProductManager = require("../dao/db/product-manager-db.js");
const productManager = new ProductManager();
const ProductModel = require("../dao/models/product.model");

//Routes:

router.get("/", async (req, res) => {
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

    res.render("index", {
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
});

router.get("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    const producto = await productManager.getProductsById(id);
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
});

router.post("/", async (req, res) => {
  const nuevoProducto = req.body;

  try {
    await productManager.addProduct(nuevoProducto);
    res.status(201).json({
      message: "Producto agregado exitosamente",
    });
  } catch (error) {
    console.log("Error al agregar producto", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const productoActualizado = req.body;

  try {
    await productManager.updateProduct(id, productoActualizado);
    res.status(201).json({
      message: "Producto actualizado exitosamente",
    });
  } catch (error) {
    console.log("Error al actualizar producto", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  try {
    await productManager.deleteProduct(id);
    res.status(201).json({
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    console.log("Error al eliminar producto", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

module.exports = router;
