const express = require("express");
const router = express.Router();
const generateUser = require("../utils/faker.js")

router.get("/", (req, res) => {
    user = [];

    for (let i = 0; i < 100; i++) {
        user.push(generateUser());
    }

    res.json(user);
})

module.exports = router;
