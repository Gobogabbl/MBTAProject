const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const shoppingCart = require("../models/shoppingCartModel");

router.get('/getWeekendPass/:userId', async (req, res) => {
    try {
        const user = await shoppingCart.findOne({ userID: req.params.userId });
        if (!user) {
            return res.status(404).send("User with userID does not exist.");
        } else {
            const crWeekendPass = user.crWeekendPass;
            return res.json(crWeekendPass);
        }
        
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
