const express = require("express");
const router = express.Router();
const ViewsController = require("../controllers/viewControllers.js")
const viewController = new ViewsController;

router.get("/realtimeproducts", viewController.realTimeProducts);

router.get("/", viewController.login);

router.get("/register", viewController.register);

router.get("/profile", viewController.profile);

module.exports = router;
