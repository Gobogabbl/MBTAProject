const mongoose = require("mongoose");

const ticketOrderSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
            label: "user ID",
        },
        username: {
            type: String,
            required: true,
            label: "username",
        },
        ticketUsage: {
            type: Boolean,
            required: true,
            label: "ticket usage",
        },
    },
    { collection: "tickets" }
);

module.exports = mongoose.model('ticket orders', ticketOrderSchema)