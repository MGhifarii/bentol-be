const express = require("express");
// import controllers
const userController = require("../controllers/userController.js");

// import middleware
const { auth } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/me", auth, userController.getMe);
router.put("/me", auth, userController.editProfile);

module.exports = router;
