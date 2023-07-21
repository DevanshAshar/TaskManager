const express = require("express");
const router = new express.Router();
const authentication = require("../middleware/auth");
const {
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
} = require("../Controllers/groupController");

router.post("/createGrp", authentication.verifyToken, createGrp);
router.post("/joinGrp", authentication.verifyToken, joinGrp);
router.delete("/deleteGrp", authentication.verifyToken, deleteGrp);
router.post("/addGrpTask", authentication.verifyToken, addGrpTask);
router.delete("/deleteGrpTask", authentication.verifyToken, deleteGrpTask);
router.post("/updateGrpTask", authentication.verifyToken, updateGrpTask);
router.post("/exit", authentication.verifyToken, leaveGrp);
router.get("/myGrps", authentication.verifyToken, myGrps);
router.post("/remove", authentication.verifyToken, remove);
router.post('/particularGrp',authentication.verifyToken,particularGrp)
module.exports = router;
