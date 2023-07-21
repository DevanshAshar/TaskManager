const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const groupSchema=new mongoose.Schema({
    name:{
        type:String
    },
    admin:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task'
    }]
},{timestamps:true})

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;