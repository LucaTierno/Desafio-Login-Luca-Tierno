const express = require("express");
const router = express.Router();

const configObject = require("../config/config.js")

router.get("/", (req, res) => {
    req.logger.error("Error fatal en el servidor"),
    req.logger.debug("Testeando servidor"),
    req.logger.info("Mensaje informativo"),
    req.logger.warning("Mensaje de alerta")
    console.log(configObject.mongo_url)
    res.send("Ruta de testeos: logs")
})

module.exports = router;