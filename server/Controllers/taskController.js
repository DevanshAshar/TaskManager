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
    const currentDate = new Date();
    const dd = new Date(deadline.split("/").reverse().join("-"));

    const deadlinePassed = currentDate > dd;

    const task = new Task({
      title: title,
      description: description,
      status: status,
      deadline: dd,
      date: currentDate,
      userId: [userData._id],
      important,
      deadlinePassed,
      for: "personal",
    });

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
    const currentDate = new Date();
    var task = await Task.find({
      userId: { $in: [userData._id] },
      deadlinePassed: false,
      for: "personal",
      status: "incomplete",
      deadline: { $gte: currentDate }
    }).sort({
      deadline: 1,
    });
    const task1 = await Task.find({
      userId: { $in: [userData._id] },
      deadlinePassed: false,
      for: "personal",
      status: "need review",
      deadline: { $gte: currentDate }
    }).sort({
      deadline: 1,
    });
    const task2 = await Task.find({
      userId: { $in: [userData._id] },
      deadlinePassed: false,
      for: "personal",
      status: "completed",
      deadline: { $gte: currentDate }
    }).sort({
      deadline: 1,
    });
    task = task.concat(task1);
    task = task.concat(task2);
    res.status(200).json({ task });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const upcomingTasks=async(req,res)=>{
  try {
    const currentDate = new Date();
    var task = await Task.find({
      userId: { $in: [userData._id] },
      deadlinePassed: false,
      status: "incomplete",
      deadline: { $gte: currentDate }
    }).sort({
      deadline: 1,
    });
    const task1 = await Task.find({
      userId: { $in: [userData._id] },
      deadlinePassed: false,
      status: "need review",
      deadline: { $gte: currentDate }
    }).sort({
      deadline: 1,
    });
    const task2 = await Task.find({
      userId: { $in: [userData._id] },
      deadlinePassed: false,
      status: "completed",
      deadline: { $gte: currentDate }
    }).sort({
      deadline: 1,
    });
    task = task.concat(task1);
    task = task.concat(task2);
    const needUrRev=await Task.find({markImp:{$in:[userData._id]},userId:{$nin:[userData._id]},deadline: { $gte: currentDate }})
    res.status(200).json({ task,needUrRev });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
const history = async (req, res) => {
  try {
    const currentDate = new Date();
    const task = await Task.find({ userId: { $in: [userData._id] },deadline: { $lt: currentDate } });
    res.status(200).json({ task });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const particularTask = async (req, res) => {
  try {
    const { tid } = req.body;
    const task = await Task.findById(tid);
    res.status(200).json({ task });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const count = async (req, res) => {
  try {
    const currentDate=new Date()
    const tasks = await Task.find({
      userId: { $in: [userData._id] },
      status: "incomplete",
      deadlinePassed: false,
      deadline: { $gte: currentDate }
    });
    const tasks1 = await Task.find({
      userId: { $in: [userData._id] },
      status: "need review",
      deadlinePassed: false,
      deadline: { $gte: currentDate }
    });
    const tasks2=await Task.find({markImp:{$in:[userData._id]},userId:{$nin:[userData._id]},deadline: { $gte: currentDate }})
    const ct = tasks.length;
    const revCt = tasks1.length;
    const otherRev=tasks2.length;
    res.status(200).json({ ct, revCt,otherRev });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const important=async(req,res)=>{
  try {
    const currentDate=new Date()
    const tasks=await Task.find({userId: { $in: [userData._id] },important:true,deadline: { $gte: currentDate }})
    res.status(200).json({tasks})
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
module.exports = {
  myTask,
  updateTask,
  deleteTask,
  tasks,
  history,
  particularTask,
  count,
  important,
  upcomingTasks
};
