const express = require("express");
const router = express.Router();
const shoppingCart = require('../models/shoppingCartModel');

router.post("/increaseCart", async (req, res) => {
    const { userId, username, quantity } = req.body;

    // Check if quantity is a valid number
    if (isNaN(quantity)) {
        return res.status(400).send("Invalid quantity value.");
    }

    var newQuantity = parseInt(quantity, 10) + 1;

    try {
        const updatedCart = await shoppingCart.findOneAndUpdate(
            { userId: userId },
            {
                username: username,
                quantity: newQuantity,
            },
            { new: true }
        );

        if (!updatedCart) {
            res.status(404).send("userId does not exist.");
        } else {
            res.json(updatedCart);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
