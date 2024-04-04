const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const shoppingCart = require("../models/shoppingCartModel");

router.get('/getWeekendPass/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send("Invalid userId format.");
        }
        
        const user = await shoppingCart.findById(userId);
        
        if (!user) {
            return res.status(404).send("User not found.");
        }

        const crWeekendPass = user.crWeekendPass;
        return res.json(crWeekendPass);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
