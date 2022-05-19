const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");
const asyncHandler = require("express-async-handler");

// import models
const User = require("../models/userModel.js");
const Vehicle = require("../models/vehicleModel.js");

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
  const userExists = await User.findOne({ email });

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
    "_id name brand"
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
  // if (!req.user) {
  //   res.status(400);
  //   throw new Error("User not found");
  // }
  const user = await User.findById(req.user._id).populate(
    "vehicle",
    "_id name brand"
  );

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.vehicle = req.body.vehicle || user.vehicle;

    const updatedUser = await user.save();
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

// // @desc    Edit user data
// // @route   PUT /api/v1/users/:id
// // @access  Public
// exports.updateUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     res.status(400);
//     throw new Error("User not found");
//   }

//   const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });

//   res.status(200).json(updatedUser);
// });

// // @desc    Delete user
// // @route   DELETE /api/v1/users/:id
// // @access  Public
// exports.deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     res.status(400);
//     throw new Error("User not found");
//   }

//   await user.remove();

//   res.status(200).json({ id: req.params.id });
// });

// OLD ##############################################

// // Register User
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Validation
//     if (!name || !email || !password || !passwordVerify)
//       return res
//         .status(400)
//         .json({ errorMessage: "Please enter all required fields." });
//     if (password.length < 6)
//       return res.status(400).json({
//         errorMessage: "Please enter a password of at least 6 characters.",
//       });

//     if (password !== passwordVerify)
//       return res.status(400).json({
//         errorMessage: "Please enter the same password twice.",
//       });

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({
//         errorMessage: "An account with this email already exists.",
//       });

//     // hash the password
//     const salt = await bcrypt.genSalt();
//     const passwordHash = await bcrypt.hash(password, salt);

//     // save a new user account to the db
//     const newUser = new User({
//       name,
//       email,
//       passwordHash,
//     });

//     const savedUser = await newUser.save();

//     // sign the token
//     const token = jwt.sign(
//       {
//         _id: savedUser._id,
//         name: savedUser.name,
//         email: savedUser.email,
//       },
//       process.env.JWT_SECRET
//     );

//     // send the token in HTTP-only cookie
//     res
//       .cookie("token", token, {
//         httpOnly: false,
//         secure: true,
//         sameSite: "none",
//       })
//       .send();
//   } catch (err) {
//     console.error(err);
//     res.status(500).send();
//   }
// };

// // Login User
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // validate

//     if (!email || !password)
//       return res
//         .status(400)
//         .json({ errorMessage: "Please enter all required fields." });

//     const existingUser = await User.findOne({ email });
//     if (!existingUser)
//       return res.status(401).json({ errorMessage: "Wrong email or password." });

//     const passwordCorrect = await bcrypt.compare(
//       password,
//       existingUser.passwordHash
//     );
//     if (!passwordCorrect)
//       return res.status(401).json({ errorMessage: "Wrong email or password." });

//     // sign the token
//     const token = jwt.sign(
//       {
//         _id: savedUser._id,
//         name: savedUser.name,
//         email: savedUser.email,
//       },
//       process.env.JWT_SECRET
//     );

//     // send the token in a HTTP-only cookie

//     res
//       .cookie("token", token, {
//         httpOnly: false,
//         secure: true,
//         sameSite: "none",
//       })
//       .send();
//   } catch (err) {
//     console.error(err);
//     res.status(500).send();
//   }
// };

// // Logout
// exports.logoutUser = (req, res) => {
//   res
//     .cookie("token", "", {
//       httpOnly: false,
//       expires: new Date(0),
//       secure: true,
//       sameSite: "none",
//     })
//     .send();
// };

// // Check is User logged in
// exports.userLoggedIn = (req, res) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) return res.json(false);

//     jwt.verify(token, process.env.JWT_SECRET);

//     res.send(true);
//   } catch (err) {
//     res.json(false);
//   }
// };

// // FOR ADMIN PAGE

// exports.getUser = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).send();
//   }
// };

// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.json(user);
//   } catch (err) {
//     res.status(404).send();
//   }
// };

// exports.saveUser = async (req, res) => {
//   const user = new User(req.body);
//   try {
//     const insertedUser = await User.save();
//     res.status(201).json(insertedUser);
//   } catch (err) {
//     res.status(404).send();
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     // const updatedUser = await User.updateOne(
//     //   { _id: req.params.id },
//     //   { $set: req.body }
//     // );
//     const updatedUser = await User.findByIdAndUpdate(
//       { _id: req.params.id },
//       { $set: req.body }
//     );

//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(404).send();
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await User.deleteOne({ _id: req.params.id });
//     res.status(200).json(deletedUser);
//   } catch (err) {
//     res.status(404).send();
//   }
// };
