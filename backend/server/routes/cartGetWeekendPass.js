const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const shoppingCart = require("../models/shoppingCartModel");

router.get('/getWeekendPass/:userId', async (req, res) => {
    try {
        const userId = req.params.userId; // Get userId from request parameters
        const isValidObjectId = mongoose.Types.ObjectId.isValid(userId); // Check if userId is a valid ObjectId
        if (!isValidObjectId) {
            return res.status(400).send("Invalid userId format."); // Return error if userId is not a valid ObjectId
        }
        const user = await shoppingCart.findOne({ _id: userId }); // Query using userId as _id
        if (!user) {
            return res.status(404).send("User with this userId does not exist.");
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
