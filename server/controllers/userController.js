const express = require("express");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
exports.userSignup = async (req, res) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    course,
    gender,
    phone,
  } = req.body;
  try {
    const findEmail = await UserModel.findOne({ email });
    if (findEmail) {
      res.status(409).json({
        message: "email Already exist",
      });
      return;
    }
    // const hashedpassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      dateOfBirth: dateOfBirth,
      phone: phone,
      course: course,
      gender: gender,
    });
    await user.save();

    res.status(200).json({
      success: true,
      message: "successfully signup",
      user,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.userlogin = async (req, res) => {
  console.log(req.body);
  const { password, email } = req.body;

  try {
    const finduser = await UserModel.findOne({ email });
    if (!finduser) {
      throw new Error("user not exist with this email");
    }

    res.status(200).json({
      success: true,
      message: "user loged in successfully",
      finduser,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
