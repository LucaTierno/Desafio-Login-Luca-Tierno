const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    req.logger.error("Error fatal en el servidor"),
    req.logger.debug("Testeando servidor"),
    req.logger.info("Mensaje informativo"),
    req.logger.warning("Mensaje de alerta")
})

module.exports = router;