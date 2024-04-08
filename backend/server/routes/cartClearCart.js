const express = require("express");
const router = express.Router();
const shoppingCart = require('../models/shoppingCartModel');

router.post("/clearCart", async (req, res) => {
    const { userId, username } = req.body;

    try {
        const updatedCart = await shoppingCart.findOneAndUpdate(
            { userId: userId }, // Query object to find the document
            { username: username, crOneWay: 0, crWeekendPass: 0 }, // Update object
            { new: true } // Options object to return the modified document
        );

        if (!updatedCart) {
            return res.status(404).send("userId does not exist.");
        }

        return res.json(updatedCart);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
