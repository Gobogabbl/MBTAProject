const express = require("express");
const router = express.Router();
const z = require('zod')
const newCart = require('../models/shoppingCartModel')

router.post('/createCart', async (req, res) => {
    const { username } = req.body

    //check if cart already exists
    const user = await newCart.findOne({ username: username })
    if (user)
        return res.status(409).send({ message: "Username is taken, pick another" })


    //creates a new user
    const createUser = new newCart({
        username: username,
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