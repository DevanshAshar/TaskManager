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
    tasks:[{
        task:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Task'
        },
        title:{
            type:String,
        },
        description:{
            type:String
        },
        status:{
            type:String,
            enum:["incomplete","completed"]
        },
        date:{
            type:String
        },
        deadline:{
            type:String
        },
        taskFor:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }],
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }]
},{timestamps:true})

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;