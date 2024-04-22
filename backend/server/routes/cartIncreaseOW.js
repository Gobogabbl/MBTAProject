const express = require("express");
const router = express.Router();
const shoppingCart = require('../models/shoppingCartModel');

router.post("/increaseOW", async (req, res) => {
    const { username } = req.body; // Change _id to username

    try {
        const user = await shoppingCart.findOne({ username: username }); // Change _id to username
        if (!user) {
            return res.status(404).send("User with username does not exist."); // Change userId to username
        } else {
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
            { username: username }, // Change _id to username
            {
                crOneWay: newOneWay,
                crWeekendPass: crWeekendPass
            },
            { new: true }
        );

        if (!updatedCart) {
            res.status(404).send("User with username does not exist."); // Change userId to username
        } else {
            res.json(updatedCart);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
