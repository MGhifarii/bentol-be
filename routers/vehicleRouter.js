const express = require("express");
const gasController = require("../controllers/gasController.js");

const router = express.Router();

router.get("/vehicle", gasController.getGas);
router.get("/vehicle/:id", gasController.getGasById);
router.post("/vehicle/:id", gasController.saveGas);
router.patch("/vehicle/:id", gasController.updateGas);
router.delete("/vehicle/:id", gasController.deleteGas);

module.exports = router;
