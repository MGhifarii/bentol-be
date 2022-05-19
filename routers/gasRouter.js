const express = require("express");
const gasController = require("../controllers/gasController.js");

const router = express.Router();

// router.get("/gas", gasController.getGas);
// router.get("/gas/:id", gasController.getGasById);
// router.post("/gas/:id", gasController.saveGas);
// router.patch("/gas/:id", gasController.updateGas);
// router.delete("/gas/:id", gasController.deleteGas);

router.get("/", gasController.getGas);
router.post("/", gasController.setGas);
router.put("/:id", gasController.updateGas);
router.delete("/:id", gasController.deleteGas);

module.exports = router;
