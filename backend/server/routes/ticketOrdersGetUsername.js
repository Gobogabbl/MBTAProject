const express = require("express");
const router = express.Router();
const newTicketOrderModel = require('../models/ticketOrderModel')

router.get('/getUsername', async (req, res) =>{
    const username = await newTicketOrderModel.find()
    if (username==null) {
        res.status(545).send("username does not exist.");
      }
    else
        return res.json(username)
})

module.exports = router;