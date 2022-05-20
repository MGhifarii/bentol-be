const express = require("express");
const vehicleController = require("../controllers/vehicleController.js");

const router = express.Router();

// router.get("/", vehicleController.getVehicles);
// router.get("/:id", vehicleController.getGasById);
// router.post("/", vehicleController.setVehicle);
// router.patch("/:id", vehicleController.updateVehicle);
// router.delete("/:id", vehicleController.deleteVehicle);

router.get("/", vehicleController.getVehicles);
router.post("/", vehicleController.setVehicle);
router.put("/:id", vehicleController.updateVehicle);
router.delete("/:id", vehicleController.deleteVehicle);

module.exports = router;
