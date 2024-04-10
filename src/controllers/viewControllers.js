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
    if (req.session.login) {
      return res.redirect("/profile");
    }
    res.render("login", {
      style: "login.css",
    });
  }

  //Vista register
  async register(req, res) {
    if (req.session.login) {
      return res.redirect("/profile");
    }

    res.render("register", {
      style: "register.css",
    });
  }

  //Vista profile
  async profile(req, res) {
    if (!req.session.login) {
      return res.redirect("/");
    }

    res.render("profile", { user: req.session.user });
  }
}

module.exports = ViewsController;
