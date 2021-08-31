const express = require('express');
const keys = require('./config/keys.js');
const app = express();

//Setting up DB
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

//Setup database models
require('./model/Account');
const Account = mongoose.model('accounts');

//Requiere routes
require('./routes/authenticationRoutes')(app);

app.listen(keys.port, () => {
    console.log("Listen on " + keys.port);
});