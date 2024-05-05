const express = require("express");
const router = express.Router();
const Cart = require('../models/shoppingCartModel')

router.put('/editCart', async (req, res) => {
    const { username, crOneWay, crWeekendPass } = req.body;

    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { username: username },
            {
                crOneWay: crOneWay,
                crWeekendPass: crWeekendPass
            },
            { new: true }
        );

        if (!updatedCart) {
            res.status(404).send("Cart doesn't exist.");
        } else {
            res.json(updatedCart);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
