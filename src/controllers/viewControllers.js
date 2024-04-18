const ProductModel = require("../models/product.model.js");
const CartRepository = require("../repositories/cart.repository.js");
const cartRepository = new CartRepository();

class ViewsController {
  //Vista para cargar productos
  async realTimeProducts(req, res) {
    try {
      res.render("realtimeproducts");
    } catch (error) {
      res.status(500).json({
        error: "Error interno del servidor",
      });
    }
  }

  //Vista login
  async login(req, res) {
    res.render("login", {
      style: "login.css",
    });
  }

  //Vista register
  async register(req, res) {
    res.render("register", {
      style: "register.css",
    });
  }

  //Vista profile
  async profile(req, res) {
    res.render("profile", { user: req.session.user });
  }
}

module.exports = ViewsController;
