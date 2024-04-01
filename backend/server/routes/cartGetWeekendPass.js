const express = require("express");
const router = express.Router();
const shoppingCart = require("../models/shoppingCartModel");

router.get('/getWeekendPass', async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await shoppingCart.findOne({ userId: userId });
        if (!user) {
            return res.status(404).send("User with userId does not exist.");
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
