const mongoose = require("mongoose");

const shoppingCartSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    
    crOneWay: { //One Way Passes, a type of ticket
        type: Number,
        required: true,
        label: "quantity",
    },

    crWeekendPass: { //Weekend Passes, a separate type of ticket
      type: Number,
      required: true,
      label: "quantity",
    },
  },
  { collection: "carts" }
);

module.exports = mongoose.model('carts', shoppingCartSchema)