const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Body = require('../model/body');

router.get("/",(req,res,next) => {
    Body.find().exec().then(result =>{
        if(result.length>=0){
            res.status(200).json(result);
        }else {
            res.status(404).json({message:"No entry found"});
        }
    }).catch(err =>{
        res.status(500).json(err);
    } );
});

router.get("/:bodyId",(req,res,next) => {
    const id = req.params.bodyId;
    Body
    .findById(id).then(result => {
        res.status(200).json(result)
    }).catch(err => {res.status(404).json(err)});
});
router.post("/",(req,res,next) => {
    var height = req.body.height / 100;
    var bodyIndex = req.body.weight / (Math.pow(height, 2));

    var bodyType = "";
    if (bodyIndex < 18.5) {
        bodyType = "zayif";
    }
    else if (bodyIndex >= 18.5 && bodyIndex <= 24.9) {
        bodyType = "normal";
    }
    else if (bodyIndex >= 25 && bodyIndex <= 29.9) {
        bodyType = "fazla kilolu";
    }
    else if (bodyIndex >= 30) {
        bodyType = "obez";
    }

    var utcTime = new Date();
    const body = new Body({
        _id:mongoose.Types.ObjectId(),
        weight:req.body.weight,
        height:req.body.height,
        user:req.body.user,
        createdAt: toLocalTime(utcTime),
        body_index:bodyType
    });
    body.save().then(result => {
        console.log(res);
        res.status(201).json({
            message:'Handling body',
            createdBody:result
        });
    }).catch(err => console.log(err));
});
    
router.patch("/:bodyId",(req,res,next) => {
    const id = req.params.bodyId;

    const updateBody = {
        weight : req.body.weight,
        height : req.body.height,
        user :   req.body.user,
        createdAt : req.body.createdAt,
        body_index:req.body.body_index
    };
    
    Body.update({_id:id}, {$set: updateBody}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({err:err})
    });
});
router.delete('/:bodyId',(req,res,next) => {
    const id = req.params.bodyId;
    Body.remove({_id:id}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
   
})
router.delete('/',(req,res,next) => {
    const id = req.params.bodyId;
    Body.remove().exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
   
})


function toLocalTime(time){
    var d = new Date(time);
    var offset = (new Date().getTimezoneOffset() / 60) * -1;
    var n = new Date(d.getTime() + offset);
    return n;
}

module.exports = router;