const mongoose = require("mongoose");

//shoppingCart schema/model
const shoppingCartSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },

    userID: 
    {
      type: String,
      required: true,
      label: "userID",
    },
    
    quantity: {
        type: Number,
        required: true,
        label: "quantity",
    },
  },
  { collection: "carts" }
);

module.exports = mongoose.model('carts', shoppingCartSchema)