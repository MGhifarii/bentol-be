const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
// import models
const User = require("../models/userModel.js");
const Vehicle = require("../models/vehicleModel.js");
const { update } = require("../models/userModel.js");

// @desc    Register new user
// @route   POST /api/v1/users
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, vehicle } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email }).populate(
    "vehicle",
    "_id name brand kmpl"
  );

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    vehicle,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      vehicle: user.vehicle,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/v1/users/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email }).populate(
    "vehicle",
    "_id name brand kmpl"
  );

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      vehicle: user.vehicle,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/v1/users/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc    Get user data
// @route   PUT /api/v1/users/me
// @access  Private
exports.editProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "vehicle",
    "_id name brand kmpl"
  );

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.vehicle = req.body.vehicle || user.vehicle;
    await user.save();
    const updatedUser = await User.findById(req.user._id).populate(
      "vehicle",
      "_id name brand kmpl"
    );
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      vehicle: updatedUser.vehicle,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});
