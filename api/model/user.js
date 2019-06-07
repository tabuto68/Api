const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:String,
    name:String,
    gender:String,
    age:Number,
    password:String
});

module.exports  = mongoose.model('User',userSchema);