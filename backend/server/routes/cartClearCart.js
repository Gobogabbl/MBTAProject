const express = require("express");
const router = express.Router();
const shoppingCart = require('../models/shoppingCartModel');

router.post("/clearCart", async (req, res) => {
    const { userId, username, date } = req.body;

    shoppingCart.findOneAndUpdate(userId, {
        username: username,
        date: date,
        quantity: 0 ,
        new: true} ,
        function (err, updatedCart) {
            if (err) {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
            if (!updatedCart) {
                res.status(404).send("userId does not exist.");
            } else {
                res.json(updatedCart);
            }
        }
    );
});

module.exports = router;
