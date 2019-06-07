const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Nutrition = require('../model/nutrition');

router.get("/",(req,res,next) => {
    Nutrition.find().exec().then(result =>{
        if(result.length>=0){
            res.status(200).json(result);
        }else {
            res.status(404).json({message:"No entry found"});
        }
    }).catch(err =>{
        res.status(500).json(err);
    } );
});

router.get("/:nutritionId",(req,res,next) => {
    const id = req.params.nutritionId;
    Nutrition
    .findById(id).then(result => {
        res.status(200).json(result)
    }).catch(err => {res.status(404).json(err)});
});
router.post("/",(req,res,next) => {
    const nutrition = new Nutrition({
        _id:mongoose.Types.ObjectId(),
        title:req.body.title,
        calori:req.body.calori,
        type:req.body.type,
        gender:req.body.gender,
        programs:req.body.programs,
        body_index:req.body.body_index,
    });
    nutrition.save().then(result => {
        console.log(res);
        res.status(201).json({
            message:'Handling body',
            createdUser:result                           //BAK!
        });
    }).catch(err => console.log(err));
});
    
router.patch("/:nutritionId",(req,res,next) => {
    const id = req.params.nutritionId;
    const updateNutrition = {
        title:req.body.title,
        calori:req.body.calori,
        type:req.body.type,
        gender:req.body.gender,
        programs:req.body.programs,
        body_index:req.body.body_index,
    };
    
    Nutrition.update({_id:id}, {$set: updateNutrition}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({err:err})
    });
});
router.delete('/:nutritionId',(req,res,next) => {
    const id = req.params.nutritionId;
    Nutrition.remove({_id:id}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
   
})

module.exports = router;