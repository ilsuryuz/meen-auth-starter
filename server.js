// ** Dependencies **
const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();

// ** Listener **
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening to port: ${PORT}`));

// ** Database Configuration **
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
// ** Database Connection Error / Success **
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// ** Middleware ** 
app.use(express.urlencoded({ extended: true}));

// ** session **
const session = require('express-session');
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
)

// ** Routes / Controllers **
const userController = require('./controllers/users');
app.use('/users', userController);

// ** session controller **
const sessionsController = require('./controllers/sessions');
app.use('/sessions', sessionsController);