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
const Task = require("../Models/task");
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
    const { title, description, status, deadline, userId,grpId,markImp } = req.body;
    const task=new Task(req.body)
    const currentDate = new Date();
    task.date=currentDate
    await task.save()
    const date = new Date().toLocaleString();
    const createdBy = userData._id;
    const lastUpdatedBy = userData._id;
    const grp = await Group.findById(req.params.id);
    grp.tasks.push(
      task._id
    );
    await grp.save()
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
    grp.users.push(userData._id);
    const user = await User.findById(userData._id);
    user.grps.push(grp._id);
    await user.save();
    await grp.save();
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
    console.log(populatedUser);
    const grps = populatedUser.grps;
    res.status(200).json({ grps });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const particularGrp = async (req, res) => {
  try {
    const { grpId } = req.body;
    const currentDate = new Date();
    const grp = await Group.findById(grpId).populate("users").populate("tasks");
    const userNames = grp.users.map((user) => user.username);
    const incompleteTasksCount = grp.tasks.filter((task) => {
      return task.status === "incomplete" && task.deadline > currentDate;
    }).length;
    const needRevTasksCount = grp.tasks.filter((task) => {
      return task && task.status === "need review" && task.deadline > currentDate;
    }).length;
    res
      .status(200)
      .json({
        group: grp,
        userNames,
        incompleteTasksCount,
        needRevTasksCount,
      });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const grpTasks=async(req,res)=>{
  try {
    const { grpId } = req.body;
    const currentDate = new Date();
    var task = await Task.find({
      userId: { $in: [userData._id] },
      deadlinePassed: false,
      status: "incomplete",
      grpId:grpId,
      deadline: { $gte: currentDate }
    }).sort({
      deadline: 1,
    });
    const task1 = await Task.find({
      userId: { $in: [userData._id] },
      deadlinePassed: false,
      status: "need review",
      grpId:grpId,
      deadline: { $gte: currentDate }
    }).sort({
      deadline: 1,
    });
    const task2 = await Task.find({
      userId: { $in: [userData._id] },
      deadlinePassed: false,
      status: "completed",
      grpId:grpId,
      deadline: { $gte: currentDate }
    }).sort({
      deadline: 1,
    });
    task = task.concat(task1);
    task = task.concat(task2);
    var needRevTasks=await Task.find({
      grpId:grpId,
      markImp:{ $in: [userData._id] },
      userId:{$nin:[userData._id]},
      deadline: { $gte: currentDate }
    }).sort({
      deadline: 1,
    })
    var otherTasks=await Task.find({
      grpId:grpId,
      userId:{$nin:[userData._id]},
      markImp:{ $nin: [userData._id] },
      deadline: { $gte: currentDate }
    })
    res.status(200).json({task,needRevTasks,otherTasks})
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}

const important=async(req,res)=>{
  try {
    const currentDate=new Date()
    const tasks=await Task.find({userId: { $in: [userData._id] },important:true,deadline: { $gte: currentDate },grpId:req.params.id}).sort({deadline:1})
    const needRev=await Task.find({userId: { $nin: [userData._id] },markImp:{$in:[userData._id]},important:true,deadline: { $gte: currentDate },grpId:req.params.id}).sort({deadline:1})
    const otherImp=await Task.find({userId: { $nin: [userData._id] },markImp:{$nin:[userData._id]},important:true,deadline: { $gte: currentDate },grpId:req.params.id}).sort({deadline:1})
    res.status(200).json({tasks,needRev,otherImp})
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
const history=async(req,res)=>{
  try {
    const currentDate = new Date();
    const task = await Task.find({ deadline: { $lt: currentDate },grpId:req.params.id });
    res.status(200).json({ task });
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
  particularGrp,
  grpTasks,
  important,
  history
};
