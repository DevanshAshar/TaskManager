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

const myTask = async (req, res) => {
  try {
    const { title, description, status, deadline, important } = req.body;
    const date = new Date().toLocaleDateString();
    const currentDate = new Date(); // Current date and time
    const dd = new Date(deadline);
    const deadlinePassed = currentDate > dd;
    const task = new Task(
      {
        title: title,
        description: description,
        status: status,
        deadline: deadline,
        date: date,
        userId: [userData._id],
        important,
        deadlinePassed,
        for:'personal'
      },
    );
    await task.save();
    res.status(200).json({ task });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const { tid, title, description, status, deadline } = req.body;
    const task = await Task.findByIdAndUpdate(req.body.tid, req.body);
    res.status(200).json({ task });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { tid } = req.body;
    const task = await Task.findByIdAndDelete(tid);
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const tasks = async (req, res) => {
  try {
    var task = await Task.find({ userId: { $in: [userData._id] },deadlinePassed:false,for:'personal',status:'incomplete'}).sort({
      deadline: 1,
    });
    const task1=await Task.find({ userId: { $in: [userData._id] },deadlinePassed:false,for:'personal',status:'need review'}).sort({
        deadline: 1,
      });
      const task2=await Task.find({ userId: { $in: [userData._id] },deadlinePassed:false,for:'personal',status:'completed'}).sort({
        deadline: 1,
      });
      task=task.concat(task1)
      task=task.concat(task2)
    res.status(200).json({ task });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const history = async (req, res) => {
    try {
      const task = await Task.find({ userId: { $in: [userData._id] },deadlinePassed:true }).sort({
        deadline: 1,
      });
      res.status(200).json({ task });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  };
  const particularTask=async(req,res)=>{
    try {
        const {tid}=req.body
        const task=await Task.findById(tid)
        res.status(200).json({task})
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  }
  const count=async(req,res)=>{
    try {
        const tasks=await Task.find({userId: { $in: [userData._id] },status:'incomplete',deadlinePassed:false})
        const tasks1=await Task.find({userId: { $in: [userData._id] },status:'need review',deadlinePassed:false})
        const ct=tasks.length
        const revCt=tasks1.length
        res.status(200).json({ct,revCt})
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
  }
module.exports = { myTask, updateTask, deleteTask, tasks,history,particularTask,count };
