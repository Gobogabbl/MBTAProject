const express = require("express");
const router = express.Router();
const shoppingCart = require('../models/shoppingCartModel');

router.post("/clearCart", async (req, res) => {
    const { _id, username } = req.body;

    try {
        const updatedCart = await shoppingCart.findOneAndUpdate(
            { username: username },
            {
                crOneWay: 0, 
                crWeekendPass: 0
            },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).send("UserId does not exist.");
        }

        return res.json(updatedCart);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
