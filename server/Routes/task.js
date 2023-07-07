const express = require("express");
const router = new express.Router();
const authentication = require("../middleware/auth");
const { myTask, updateTask,deleteTask } = require("../Controllers/taskController");

router.post('/myTask',authentication.verifyToken,myTask)
router.patch('/updateTask',authentication.verifyToken,updateTask)
router.delete('/deleteTask',authentication.verifyToken,deleteTask)
module.exports=router