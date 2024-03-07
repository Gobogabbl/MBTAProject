const express = require('express');
const router = express.Router();
const TicketOrder = require('../models/ticketOrderModel');

router.post('/ticketUsage', async (req, res) => {
    try {
        const {userID} = req.body;
        
        if (!userID){
            return res.status(404).json({error: "user ID not found"});
        }

        const ticketOrder = await TicketOrder.findOne({userID});

        if (!ticketOrder) {
            return res.status(404).json({error: "No tickets found"});
        }

        if (ticketOrder.ticketUsage) {
            return res.json({ticketUsage: true});
        }

        ticketOrder.ticketUsage = true;
        await ticketOrder.save();

        res.json({ ticketUsage: ticketOrder.ticketUsage });
    } catch (error){
        console.error("Error:", error);
        res.status(711).json({error: "Internal Server Error"});
    }
});

module.exports = router;