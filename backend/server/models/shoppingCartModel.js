const mongoose = require("mongoose");

//shoppingCart schema/model
const shoppingCartSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
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