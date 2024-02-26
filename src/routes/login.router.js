const express = require("express");
const router = express.Router();
const UserModel = require("../dao/models/user.model");

//Login

router.post("/start", async (req, res) => {
    const {email, password} = req.body;
    try {
        const usuario = await UserModel.findOne({email: email});

        if(usuario) {
            //Login
            if(usuario.password === password) {
                req.session.login = true
                res.status(200).send({message: "Sesion iniciada"})
            } else {
                res.status(401).send({error: "Contraseña incorrecta"})
            }
        } else {
            res.status(404).send({error: "Mail incorrecto"})
        }
    } catch (error) {
        res.status(400).send({error: "Error al iniciar sesion"})
    }
})

//Logout

router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy();
        res.status(200).send({message: "Sesion cerrada"})
    }
})

module.exports = router;