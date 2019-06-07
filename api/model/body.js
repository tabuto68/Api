const mongoose = require('mongoose');

const bodySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    weight:Number,
    height:Number,
    user:String,
    createdAt:Date,
    body_index:String
});

module.exports  = mongoose.model('Body',bodySchema);