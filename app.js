const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:' + process.env.MONGO_ATLAS_PW + '@keepfit-b0f35.mongodb.net/test?retryWrites=true');

const app  = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));  //false idi
app.use(bodyParser.json());
const users = require('./api/controllers/user');
app.use('/users',users);
const bodies = require('./api/controllers/body');
app.use('/bodies',bodies);
const workouts = require('./api/controllers/workout');
app.use('/workouts',workouts);
const nutritions = require('./api/controllers/nutrition');
app.use('/nutritions',nutritions);
app.use((req,res,next)=> {
    res.status(200).json({
        message:'WElcome to party !'
    })
});

module.exports = app;