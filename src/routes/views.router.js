const express = require("express");
const router = express.Router();

router.get("/chat", async (req, res) => {
  // res.render("chat");
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realtimeproducts");
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

module.exports = router;
