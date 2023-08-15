const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const taskSchema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    status:{
        type:String,
        enum:["incomplete","completed","need review"]
    },
    date:{
        type:Date
    },
    deadline:{
        type:Date
    },
    userId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    grpId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group'
    },
    important:{
        type:Boolean,
        default:false
    },
    for:{
        type:String,
        enum:['personal','group']
    },
    markImp:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    lastUpdatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    deadlinePassed:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;