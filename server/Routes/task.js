const express = require("express");
const router = new express.Router();
const authentication = require("../middleware/auth");
const { myTask, updateTask,deleteTask, tasks, history, particularTask, count } = require("../Controllers/taskController");

router.post('/myTask',authentication.verifyToken,myTask)
router.patch('/updateTask',authentication.verifyToken,updateTask)
router.delete('/deleteTask',authentication.verifyToken,deleteTask)
router.get('/getTasks',authentication.verifyToken,tasks)
router.get('/history',authentication.verifyToken,history)
router.post('/particularTask',authentication.verifyToken,particularTask)
router.get('/getCount',authentication.verifyToken,count)
module.exports=router