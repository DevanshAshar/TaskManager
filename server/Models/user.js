const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
        minlength: [8, "Password must contain minimum 8 characters "],
      },
      email: {
        type: String,
        required: true,
        unique: [true, "email-id exists"],
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid Email-Id");
          }
        },
      },
      otp: { type: Number },
      otpExpire: { type: Number },
      otp: { type: Number },
      grps:[{
        grpid:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'Group'
        }
      }]
    },
    { timestamps: true }
  );
  
  userSchema.post("save", function (doc, next) {
    console.log("new User created", doc);
    next();
  });
  
  userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 9);
    }
    next();
  });
  
  const User = mongoose.model("User", userSchema);
  module.exports = User;