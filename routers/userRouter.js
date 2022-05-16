// const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const express = require("express");
const User = require("../models/userModel");
const userController = require("../controllers/userController.js");

const router = express.Router();

// Authentication Router
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.get("/loggedIn", userController.userLoggedIn);

// User Router
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUser);

module.exports = router;
