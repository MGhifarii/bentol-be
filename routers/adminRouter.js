const express = require("express");
// import controllers
const adminController = require("../controllers/adminController.js");

// import middleware
const { adminAuth } = require("../middleware/admin/adminAuthMiddleware.js");

const router = express.Router();

router.post("/add", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);
router.get("/me", adminController.getMe);
// router.get("/me", adminController.getProfile);
// router.put("/me", auth, adminController.editProfile);

module.exports = router;
