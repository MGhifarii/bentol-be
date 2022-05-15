const express = require("express");
const gasController = require("../controllers/gasController.js");

const router = express.Router();

router.get("/gas", gasController.getGas);
router.get("/gas/:id", gasController.getGasById);
router.post("/gas/:id", gasController.saveGas);
router.patch("/gas/:id", gasController.updateGas);
router.delete("/gas/:id", gasController.deleteGas);

module.exports = router;
