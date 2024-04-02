const express = require("express");
const router = express.Router();
const shoppingCart = require('../models/shoppingCartModel');

router.post("/increaseWP", async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await shoppingCart.findOne({ userId: userId });
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

    var newWeekendPass = crWeekendPass + 1;

    try {
        const updatedCart = await shoppingCart.findOneAndUpdate(
            { userId: userId },
            {
                username: username,
                crOneWay: crOneWay,
                crWeekendPass: newWeekendPass
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
