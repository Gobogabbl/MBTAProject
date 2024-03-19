const express = require("express");
const router = express.Router();
const z = require('zod')
const newCart = require('../models/shoppingCartModel')

router.post('/createCart', async (req, res) => {
    const { username, userID } = req.body

    //check if cart already exists
    const user = await newCart.findOne({ username: username, userID: userID })
    if (user)
        return res.status(409).send({ message: "User is taken, pick another" })


    //creates a new user
    const createUser = new newCart({
        username: username,
        userID: userID,
        quantity: 1,
    });

   
    try {
        const saveNewUser = await createUser.save();
        res.send(saveNewUser);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new user" });
    }

})

module.exports = router;