const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')
const getAllAuthRoute = require('./routes/authorizationRoutes')
const assignAuth = require('./routes/authorizationRoutes')
const getAuthByID = require('./routes/authorizationRoutes')
const allUnderAuth = require('./routes/authorizationRoutes')
const deleteAuth = require('./routes/authorizationRoutes')
const createCart = require('./routes/cartCreateCart')
const getTickets = require('./routes/cartGetTickets')
const clearCart = require('./routes/cartClearCart')
const reduceCart = require('./routes/cartReduceCart')
const increaseCart = require('./routes/cartIncreaseCart')
const deleteCarts = require('./routes/cartDeleteCarts')

require('dotenv').config();
const SERVER_PORT = 8081

dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)
app.use('/auth', getAllAuthRoute)
app.use('/auth', assignAuth)
app.use('/auth', getAuthByID)
app.use('/auth', allUnderAuth)
app.use('/auth', deleteAuth)
app.use('/cart', getTickets)
app.use('/cart', clearCart)
app.use('/cart', reduceCart)
app.use('/cart', increaseCart)
app.use('/cart', createCart)
app.use('/cart', deleteCarts)

app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
