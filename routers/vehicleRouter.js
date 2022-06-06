const express = require("express");
const vehicleController = require("../controllers/vehicleController.js");
const { adminAuth } = require("../middleware/admin/adminAuthMiddleware.js");

const router = express.Router();

router.get("/", vehicleController.getVehicles);
router.get("/:id", vehicleController.getVehicleById);
router.post("/", adminAuth, vehicleController.setVehicle);
router.put("/:id", adminAuth, vehicleController.updateVehicle);
router.delete("/:id", adminAuth, vehicleController.deleteVehicle);

module.exports = router;
