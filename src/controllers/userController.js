const UserModel = require("../models/user.model.js");
const CartModel = require("../models/cart.model.js");
const jwt = require("jsonwebtoken");
const { createHash, isValidPassword } = require("../utils/hashBcrypt.js");
//const UserDTO = require("../dto/user.dto.js");

class UserController {
  //Login
  async login(req, res) {
    if (!req.user)
      return res
        .status(401)
        .send({ status: "Error", message: "Credenciales invalidas" });

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };

    req.session.login = true;

    res.redirect("/api/products");
  }

  //Register
  async register(req, res) {
    const { first_name, last_name, email, password, age } = req.body;
    try {
      const existeUsuario = await UserModel.findOne({ email });
      if (existeUsuario) {
        return res.status(400).send("El usuario ya existe");
      }

      const nuevoCarrito = new CartModel();
      await nuevoCarrito.save();

      const nuevoUsuario = new UserModel({
        first_name,
        last_name,
        email,
        cart: nuevoCarrito._id,
        password: createHash(password),
        age,
      });

      await nuevoUsuario.save();

      const token = jwt.sign({ user: nuevoUsuario }, "coderhouse", {
        expiresIn: "1h",
      });

      res.cookie("coderCookieToken", token, {
        maxAge: 3600000,
        httpOnly: true,
      });

      res.redirect("/api/products");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  }

  //Logout
  async logout(req, res) {
    if (req.session.login) {
      req.session.destroy();
      //res.status(200).send({ message: "Sesion cerrada" }).
      res.redirect("/");
    }
  }

  //Fail Login
  async faillogin(req, res) {
    console.log("Fallo la estrategia");
    res.send({ error: "Error" });
  }

  //Register con Github
  async registerGithub(req, res) {
    //La estrategía de github nos retornara el usuario, entonces lo agregamos a nuestro objeto de sesion.
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/profile");
  }
}

module.exports = UserController;
