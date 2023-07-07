const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const { sendEmail } = require("../utility/functions");
const User = require("../Models/user");
const nodemailer = require("nodemailer");
const Task = require("../Models/task");
app.use(express.json());

const myTask=async(req,res)=>{
    try {
        const {title,description,status,deadline}=req.body
        const date=new Date().toLocaleDateString()
        const task=new Task({title:title,description:description,status:status,deadline:deadline,date:date,userId:userData._id})
        await task.save()
        res.status(200).json({task})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message:error.message})
    }
}
const updateTask=async(req,res)=>{
    try {
        const {tid,title,description,status,deadline}=req.body
        const task=await Task.findByIdAndUpdate(req.body.tid,req.body)
        res.status(200).json({task})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message:error.message})
    }
}
const deleteTask=async(req,res)=>{
    try {
        const {tid}=req.body
        const task=await Task.findByIdAndDelete(tid)
        res.status(200).json({message:'deleted'})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message:error.message})
    }
}
const tasks=async(req,res)=>{
    try {
        const task=await Task.find({userId:userData._id})
        res.status(200).json({task})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message:error.message})
    }
}
module.exports={myTask,updateTask,deleteTask}