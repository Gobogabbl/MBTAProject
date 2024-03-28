const express = require("express");
const router = express.Router();
const authorizationModel = require('../models/authorizationModel')
const authModel = require('../models/authorizationModel')

//ROUTE
//Assigns the authorization of a user
router.post('/assignAuth', async (req, res) => {
  try {
    const { userID, authorizationRole } = req.body;

    // Check if userID and authorizationRole are provided
    if (!userID || !authorizationRole) {
      return res.status(400).json({ error: "userID and authorizationRole are required." });
    }

    // Create and save the authorization for the user
    const createAuth = new authorizationModel({
      userID: userID,
      authorizationRole: authorizationRole
    });

    const savedAuth = await createAuth.save();
    return res.status(201).json(savedAuth);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE
//gets a user's authorization
router.get("/getAuthById", async (req, res) => {
  try {
    const { userID } = req.body;

    // Check if userId is provided
    if (!userID) {
      return res.status(400).json({ error: "userID is required." });
    }

    // Find the user's authorization by userID
    const auth = await authorizationModel.findOne({ userID: userID });

    // Check if the authorization exists
    if (!auth) {
      return res.status(404).json({ error: "Authorization not found for the user." });
    }

    // Return the authorization information
    return res.json({ auth });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//ROUTE
//retrieves all the users and authorizations
router.get('/getAllAuth', async (req, res) => {
  try {
    // Use aggregate to group by userID and get the latest authorization entry
    const auth = await authorizationModel.aggregate([
      {
        $group: {
          _id: '$userID',
          latestAuth: { $last: '$$ROOT' } // Get the latest authorization entry for each user
        }
      },
      {
        $replaceRoot: { newRoot: '$latestAuth' } // Replace the root document with the latestAuth
      }
    ]);

    return res.json(auth);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE
//retrieves all users under a certain authorization(User or Admin)
router.get("/allUnderAuth", async (req, res) => {
  try {
    const { authorizationRole } = req.body;

    // Check if authorizationRole is provided and valid
    if (!authorizationRole || (authorizationRole !== "Admin" && authorizationRole !== "User")) {
      return res.status(400).json({ error: "Invalid authorization role." });
    }

    // Find the user by authorizationRole
    const user = await authModel.find({ authorizationRole: authorizationRole });

    // Check if users exist
    if (!user || user.length === 0) {
      return res.status(404).json({ error: `No users found with the role ${authorizationRole}.` });
    }

    // Return the user(s)
    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE
//Deletes a user's authorization so that another can be assigned to them
router.post('/deleteAuth', async (req, res) => {
  try {
    const { userID } = req.body;

    // Check if userId is provided
    if (!userID) {
      return res.status(400).json({ error: "userID is required." });
    }

    // Find and delete the authorization for the user
    const deletedAuth = await authorizationModel.findOneAndDelete({ userID: userID });

    // Check if the authorization was found and deleted
    if (!deletedAuth) {
      return res.status(404).json({ error: "Authorization not found for the user." });
    }

    return res.json({ message: "Authorization deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

  module.exports = router;