const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const { sendEmail } = require("../utility/functions");
const User = require("../Models/user");
const nodemailer = require("nodemailer");
app.use(express.json());
const auth = async (req, res) => {
  try {
    res.status(200).json({ user: userData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const newUser = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email)
    return res
      .status(400)
      .json({ error: "Please fill the necessary details " });
  const user = new User(req.body);
  try {
    await user.save();
    res.json({ message: "Success", user }).status(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Please Fill the Details" });
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) return res.status(400).json({ error: "User not found" });
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!userData || !validPassword)
      res.status(400).json({ error: "Invalid credentials" });
    else {
      const token = jwt.sign(
        { email: req.body.email },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );
      await userData.save();
      return res.status(200).json({ token: token, user: userData });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
const forgotPass = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "No user found" });
    const otp = Math.floor(Math.random() * 10000);
    await User.findByIdAndUpdate(user._id, {
      otp: otp,
      otpExpire: new Date().getTime() + 300 * 1000,
    });
    await sendEmail({
      emailId: email,
      subject: "OTP for your account at E-Commerce App",
      message: `OTP to reset password is ${otp},  Otp valid for 5 mins`,
    });
    res.status(200).json({ message: "OTP sent on registered email" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    console.log(email);
    let currentTime = new Date().getTime();
    const user = await User.findOne({ email: email });
    let diff = user.otpExpire - currentTime;
    if (diff < 0)
      // checking if otp is expired or not
      return res.status(400).json({ message: "Time limit exceeded" });
    if (!otp) res.status(400).json({ error: "Please enter otp!!!" });
    else if (otp == user.otp) {
      return res.status(200).json({ message: "otp verified" });
    } else {
      return res.status(400).json({ message: "invalid otp" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const newPass = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email: email });
    if (!password)
      return res.status(400).json({ message: "Please enter details" });
    user.password = password; //updating password
    await user.save();
    res.status(200).json({ message: "password updated" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

module.exports={auth,newUser,userLogin,forgotPass,verifyOtp,newPass}
