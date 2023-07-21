const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const { sendEmail } = require("../utility/functions");
const User = require("../Models/user");
const nodemailer = require("nodemailer");
const Group = require("../Models/group");
app.use(express.json());
const createGrp = async (req, res) => {
  try {
    const { name } = req.body;
    const grp = new Group({ name: req.body.name, admin: userData._id });
    grp.users.push(userData._id);
    await grp.save();
    userData.grps.push(grp._id);
    await userData.save();
    res.status(200).json({ grp });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const addGrpTask = async (req, res) => {
  try {
    const { grpid, title, description, status, deadline, taskFor } = req.body;
    const date = new Date().toLocaleString();
    const createdBy = userData._id;
    const lastUpdatedBy = userData._id;
    const grp = await Group.findById(grpid);
    grp.tasks.push({
      title: title,
      description: description,
      status: status,
      deadline: deadline,
      taskFor: taskFor,
      date: date,
      lastUpdatedBy: lastUpdatedBy,
      createdBy: createdBy,
    });
    res.status(200).json({ grp });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const joinGrp = async (req, res) => {
  try {
    const { grpid } = req.body;
    const grp = await Group.findById(grpid);
    if (!grp) return res.status(400).json({ message: "No such grp found" });
    grp.tasks.users.push(userData._id);
    const user = await User.findById(userData._id);
    user.grps.push(grp._id);
    res.status(200).json({ grp });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const leaveGrp = async (req, res) => {
  try {
    const { grpid } = req.body;
    const grp = await Group.findById(grpid);
    if (!grp) return res.status(400).json({ message: "No such grp found" });
    grp.users.filter((user) => {
      return user._id != userData._id;
    });
    res.status(200).json({ grp });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { grpid, userId } = req.body;
    const grp = await Group.findById(grpid);
    if (!grp) return res.status(400).json({ message: "No such grp found" });
    if (grp.admin !== userData._id)
      return res.status(400).json({ message: "Not admin" });
    grp.users.filter((user) => {
      return user._id != userId;
    });
    res.status(200).json({ grp });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const updateGrpTask = async (req, res) => {
  try {
    const { grpid, title, description, status, deadline, taskFor, tid } =
      req.body;
    const grp = await Group.findById(grpid);
    grp.tasks.forEach((task) => {
      if (task._id === tid) {
        (task.title = title),
          (task.description = description),
          (task.status = status),
          (task.deadline = deadline),
          (task.taskFor = taskFor);
        task.lastUpdatedBy = userData._id;
      }
    });
    res.status(200).json({ grp });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const deleteGrpTask = async (req, res) => {
  try {
    const { grpid, tid } = req.body;
    const grp = await Group.findById(grpid);
    if (grp.admin !== userData._id)
      return res.status(400).json({ message: "Not admin" });
    grp.tasks.filter((task) => {
      return task._id != tid;
    });
    res.status(200).json({ grp });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const deleteGrp = async (req, res) => {
  try {
    const { grpid } = req.body;
    const grp = await Group.findByIdAndDelete(grpid);
    if (grp.admin !== userData._id)
      return res.status(400).json({ message: "Not admin" });
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const myGrps = async (req, res) => {
  try {
    const populatedUser = await User.findById(userData._id).populate({
      path: "grps._id",
      model: "Group",
    });
    console.log(populatedUser)
    const grps = populatedUser.grps;
    res.status(200).json({ grps });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const particularGrp=async(req,res)=>{
  try {
    const {grpId}=req.body
    const grp=await Group.findById(grpId).populate('users')
    const userNames = grp.users.map(user => user.username);
    res.status(200).json({userNames})
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createGrp,
  joinGrp,
  deleteGrp,
  updateGrpTask,
  leaveGrp,
  addGrpTask,
  deleteGrpTask,
  remove,
  myGrps,
  particularGrp
};
