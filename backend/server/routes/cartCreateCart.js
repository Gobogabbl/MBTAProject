const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const newCart = require('../models/shoppingCartModel');

router.post('/createCart', async (req, res) => {
    const { username } = req.body

    // Check if cart already exists
    const user = await newCart.findOne({ username: username })
    if (user)
        return res.status(409).send({ message: "User is taken, pick another" })

    // Create a new user
    const createUser = new newCart({
        username: username,
        crOneWay: 0,
        crWeekendPass: 0,
    });

   
    try {
        const saveNewUser = await createUser.save();
        res.send(saveNewUser);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new user" });
    }
})

module.exports = router;
