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
        enum:["incomplete","completed"]
    },
    date:{
        type:String
    },
    deadline:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;