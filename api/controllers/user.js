const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../model/user');

router.get("/",(req,res,next) => {
    User.find().exec().then(result =>{
        if(result.length>=0){
            res.status(200).json(result);
        }else {
            res.status(404).json({message:"No entry found"});
        }
    }).catch(err =>{
        res.status(500).json(err);
    } );
});

router.get("/:userId",(req,res,next) => {
    const id = req.params.userId;
    User
    .findById(id).then(result => {
        res.status(200).json(result)
    }).catch(err => {res.status(404).json(err)});
});
router.post("/",(req,res,next) => {
    const user = new User({
        _id:mongoose.Types.ObjectId(),
        email:req.body.email,
        name:req.body.name,
        gender:req.body.gender,
        age:req.body.age,
        password:req.body.password
    });
    user.save().then(result => {
        console.log(res);
        res.status(201).json({
            message:'Handling body',
            createdUser:result
        });
    }).catch(err => console.log(err));
});

router.post("/checkUser",(req,res,next) => {
    
    User.find({email:req.body.email, password:req.body.password}).then(result => {
        console.log(result);
        res.status(201).json({
            isSuccess : result.length > 0 ? true : false
        });
    }).catch(err => console.log(err));
});

router.patch("/:userId",(req,res,next) => {
    const id = req.params.userId;
    const updateUser = {
        email : req.body.email,
        name : req.body.name,
        gender : req.body.gender,
        age : req.body.age,
        password : req.body.password
    };
    
    User.update({_id:id}, {$set: updateUser}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({err:err})
    });
});

router.delete('/:userId',(req,res,next) => {
    const id = req.params.userId;
    User.remove({_id:id}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
})
router.delete('/',(req,res,next) => {
    const id = req.params.userId;
    User.remove().exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json(err);
    });
})

module.exports = router;