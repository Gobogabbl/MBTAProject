const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const shoppingCart = require("../models/shoppingCartModel");

router.get('/getWeekendPass/:username', async (req, res) => {
    try {
        const username = req.params.username; // Get userId from request parameters
        const user = await shoppingCart.findOne({ username: username }); // Query using userId as _id
        if (!user) {
            return res.status(404).send("User with this username does not exist.");
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
