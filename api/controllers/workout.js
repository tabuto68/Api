const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Workout = require('../model/workout');

router.get("/",(req,res,next) => {
    Workout.find().exec().then(result =>{
        if(result.length>=0){
            res.status(200).json(result);
        }else {
            res.status(404).json({message:"No entry found"});
        }
    }).catch(err =>{
        res.status(500).json(err);
    } );
});

router.get("/:workoutId",(req,res,next) => {
    const id = req.params.bodyId;
    Workout
    .findById(id).then(result => {
        res.status(200).json(result)
    }).catch(err => {res.status(404).json(err)});
});

router.get("/:body_index",(req,res,next) => {
    const id = req.params.body_index;
    Workout.find({body_index:id}).then(result => {
        res.status(200).json(result)
    })
    .catch(err => {res.status(404).json(err)});
});

router.post("/",(req,res,next) => {
    const workout = new Workout({
        _id:mongoose.Types.ObjectId(),
        name:req.body.name,
        amount:req.body.amount,
        setSize:req.body.setSize,
        description:req.body.description,
        gender:req.body.gender,
        body_index:req.body.body_index
    });
    workout.save().then(result => {
        console.log(res);
        res.status(201).json({
            message:'Handling body',
            createdUser:result
        });
    }).catch(err => console.log(err));
});
    
router.patch("/:workoutId",(req,res,next) => {
    const id = req.params.workoutId;
    const updateWorkout = {
        name:req.body.name,
        amount:req.body.amount,
        setSize:req.body.setSize,
        description:req.body.description,
        gender:req.body.gender,
        body_index:req.body.body_index
    };
    
    Workout.update({_id:id}, {$set: updateWorkout}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({err:err})
    });
});
router.delete('/:workoutId',(req,res,next) => {
    const id = req.params.workoutId;
    Workout.remove({_id:id}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
   
})

module.exports = router;