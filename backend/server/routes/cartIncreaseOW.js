const express = require("express");
const router = express.Router();
const shoppingCart = require('../models/shoppingCartModel');

router.post("/increaseOW", async (req, res) => {
    const { _id } = req.body;

    try {
        const user = await shoppingCart.findOne({ _id: _id });
        if (!user) {
            return res.status(404).send("User with userId does not exist.");
        } else {
            var username = user.username;
            var crOneWay = user.crOneWay;
            var crWeekendPass = user.crWeekendPass;
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }

    var newOneWay = crOneWay + 1;

    try {
        const updatedCart = await shoppingCart.findOneAndUpdate(
            { _id: _id },
            {
                username: username,
                crOneWay: newOneWay,
                crWeekendPass: crWeekendPass
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
