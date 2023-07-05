const express = require("express");
const router = new express.Router();
const {
  auth,
  newUser,
  userLogin,
  forgotPass,
  verifyOtp,
  newPass,
} = require("../Controllers/userController");
const authentication = require("../middleware/auth");
router.post("/newUser", newUser);
router.post("/userLogin", userLogin);
router.post("/forgotPass", forgotPass);
router.post("/verifyOtp", verifyOtp);
router.post("/newPass", newPass);
router.get("/auth", authentication.verifyToken, auth);
module.exports = router;
