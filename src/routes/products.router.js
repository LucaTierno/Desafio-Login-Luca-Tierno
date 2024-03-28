const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/productController.js");
const productController = new ProductController();

//Routes:

router.post("/", productController.addProduct);

router.get("/", productController.getProducts)

router.get("/:pid", productController.getProductsById);

router.put("/:pid", productController.updateProduct);

router.delete("/:pid", productController.deleteProduct);

module.exports = router;
