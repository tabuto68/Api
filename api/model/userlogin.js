const mongoose = require('mongoose');

const userloginSchema = mongoose.Schema({
    name:String,
    password:String
});

module.exports  = mongoose.model('UserLogin',userloginSchema);