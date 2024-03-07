const express = require("express");
const router = express.Router();
const newCart = require('../models/shoppingCartModel')

router.post('/deleteCarts', async (req, res) => {
    const cart = await newCart.deleteMany();
    return res.json(cart)
  })

  module.exports = router;