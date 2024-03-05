const express = require("express");
const router = express.Router();
const authorizationModel = require('../models/authorizationModel')
const newUserModel = require('../models/userModel')

//ROUTE
//Assigns the authorization of a user
router.post('/assignAuth', async (req, res) => 
{
  // const { error } = userLoginValidation(req.body);
  // if (error) return res.status(400).send({ message: error.errors[0].message });

  const { username, userID, authorizationRole } = req.body

  user = await newUserModel.findOne({ username: username });

  //checks if the username exists
  if (!user)
    return res
      .status(406)
      .send({ message: "username not found" });

  user = await newUserModel.findOne({ userID: userID });

  //checks if the userID exists
  if(!userID)
    return res
      .status(404)
      .send({message: "userID not found"})

  //creates the authorization for the user
  const createAuth = new authorizationModel
  ({
    username: username,
    userID: userID,
    authorizationRole: authorizationRole
});

try {
    const saveAuth = await createAuth.save();
    res.send(saveNewAuth);
} catch (error) {
    res.status(400).send({ message: "Error trying to create new authorizaton" });
}

})

//ROUTE
//gets a user's authorization
router.get("/getAuthById", async (req, res) => {
  var { userId } = req.body;

  newUserModel.findById(userId, function (err, user) {
    if (err) {
      console.log(err);
    }
    if (user==null) {
      res.status(404).send("userId does not exist.");
    } 
    else {
      return res.json(user);
    }
  });
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
    if (user==null) {
      res.status(9448).send("role does not exist.");
    } 
    else {
      return res.json(user);
    }
  });
});

  module.exports = router;