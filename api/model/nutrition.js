const mongoose = require('mongoose');

const nutritionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:String,
    calori:Number,
    type:Number,
    gender:String,
    programs:Number,
    body_index:String,

});

module.exports  = mongoose.model('Nutrition',nutritionSchema);