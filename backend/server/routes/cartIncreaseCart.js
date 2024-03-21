const express = require("express");
const router = express.Router();
const shoppingCart = require('../models/shoppingCartModel');

router.post("/increaseCart", async (req, res) => {
    const { userId, username } = req.body;

    try {
        const user = await shoppingCart.findOne({ userId: userId });
        if (!user) {
            return res.status(404).send("User with userId does not exist.");
        } else {
            var quantity = user.quantity;
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }

    var newQuantity = quantity + 1;

    try {
        const updatedCart = await shoppingCart.findOneAndUpdate(
            { userId: userId },
            {
                username: username,
                quantity: newQuantity
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
