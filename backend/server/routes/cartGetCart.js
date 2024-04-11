const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const shoppingCart = require("../models/shoppingCartModel");

router.get('/getCart/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await shoppingCart.findOne({ username: username });
        if (!user) {
            return res.status(404).send("User with this username does not exist.");
        } else {
            return res.json(user);
        }
        
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;