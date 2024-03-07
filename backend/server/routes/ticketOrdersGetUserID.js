const express = require("express");
const router = express.Router();
const newTicketOrderModel = require('../models/ticketOrderModel')

router.get('/getUserID', async (req, res) =>{
    const userID = await newTicketOrderModel.find()
    if (userID==null) {
        res.status(404).send("userId does not exist.");
      }
    else
        return res.json(userID)
})

module.exports = router;