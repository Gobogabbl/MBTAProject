const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const shoppingCart = require("../models/shoppingCartModel");

router.get('/getOneWay/:_id', async (req, res) => {
    try {
        const _id = req.params._id; // Get userId from request parameters
        const isValidObjectId = mongoose.Types.ObjectId.isValid(_id); // Check if userId is a valid ObjectId
        if (!isValidObjectId) {
            return res.status(400).send("Invalid userId format."); // Return error if userId is not a valid ObjectId
        }
        const user = await shoppingCart.findOne({ _id: _id }); // Query using userId as _id
        if (!user) {
            return res.status(404).send("User with this userId does not exist.");
        } else {
            const crOneWay = user.crOneWay;
            return res.json(crOneWay);
        }
        
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
