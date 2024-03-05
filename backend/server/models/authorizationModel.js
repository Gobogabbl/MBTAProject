const mongoose = require("mongoose");

//authorization schema/model
const authorizationSchema = new mongoose.Schema(
  {
    username: 
    {
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

    authorizationRole: 
    {
      required: true,
      type: String,
      label: "authorization"
    },
  },
  { collection: "authorizations" }
);

module.exports = mongoose.model('authorizations', authorizationSchema)