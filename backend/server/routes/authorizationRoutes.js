const express = require("express");
const router = express.Router();
const authorizationModel = require('../models/authorizationModel')
const newUserModel = require('../models/userModel')

//ROUTE
//Assigns the authorization of a user
router.post('/assignAuth', async (req, res) => {
  try {
    const { username, userID, authorizationRole } = req.body;

    // Check if username and userID are provided
    if (!username || !userID) {
      return res.status(400).send({ message: "Both username and userID are required." });
    }

    // Check if the authorization already exists for the given userID
    const existingAuth = await authorizationModel.findOne({ userID: userID });
    if (existingAuth) {
      return res.status(409).send({ message: "Authorization already exists for the given userID." });
    }

    // Check if the user with the specified username exists
    const user = await newUserModel.findOne({ username: username });
    if (!user) {
      return res.status(404).send({ message: "User not found with the specified username." });
    }

    // Create and save the authorization for the user
    const createAuth = new authorizationModel({
      username: username,
      userID: userID,
      authorizationRole: authorizationRole
    });

    const saveAuth = await createAuth.save();
    res.status(201).send(saveAuth);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//ROUTE
//gets a user's authorization
router.get("/getAuthById", async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ error: "userId is required." });
    }

    // Find the user by userId
    const user = await newUserModel.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Find the authorization information for the user
    const auth = await authorizationModel.findOne({ userID: userId }); // Change to 'userID' if that's the field name

    // Check if authorization information exists
    if (!auth) {
      return res.status(404).json({ error: "Authorization not found for the user." });
    }

    // Return the user and authorization information
    return res.json({ user, auth });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE
//retrieves all the users and authorizations
router.get('/getAllAuth', async (req, res) => 
{
    const auth = await authorizationModel.find();
    return res.json(auth)
  })

//ROUTE
//retrieves all users under a certain authorization(User or Admin)
router.get("/allUnderAuth", async (req, res) => {
  var { authorizationRole } = req.body;

  newUserModel.findById(authorizationRole, function (err, user) {
    if (err) {
      console.log(err);
    }
    if (user!="Admin" ||user!="User") {
      res.status(202).send("role does not exist.");
    }
    if(user=="Admin")
    {
      
    } 
    if(user=="User")
    {

    }
    else {
      return res.json(user);
    }
  });
});

  module.exports = router;