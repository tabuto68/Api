const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    amount:Number,
    setSize:Number,
    description:String,
    gender:String,
    body_index:String,

});

module.exports  = mongoose.model('Workout',workoutSchema);