const asyncHandler = require("express-async-handler");
const { restart } = require("nodemon");
const Vehicle = require("../models/vehicleModel.js");

// @desc    Get vehicles
// @route   GET /api/v1/vehicles
// @acces   Public
exports.getVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find();

  res.status(200).json(vehicles);
});

// @desc    Set vehicle
// @route   POST /api/v1/vehicles
// @access  Public
exports.setVehicle = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.brand || !req.body.kmpl) {
    restart.status(400);
    throw new Error("Please fill in all field");
  }

  const vehicle = await Vehicle.create({
    name: req.body.name,
    brand: req.body.brand,
    kmpl: req.body.kmpl,
  });

  res.status(200).json(vehicle);
});

// @desc    Update vehicle
// @route   PUT /api/v1/vehicles/:id
// @access  Public
exports.updateVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    res.status(400);
    throw new Error("Vehicle not found");
  }

  const updatedVehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedVehicle);
});

// @desc    Delete vehicle
// @route   DELETE /api/v1/vehicles/:id
// @access  Public
exports.deleteVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) {
    res.status(400);
    throw new Error("Vehicle not found");
  }

  await vehicle.remove();

  res.status(200).json({ id: req.params.id });
});

// OLD #########################

// exports.getGas = async (req, res) => {
//   try {
//     const vehicles = await Vehicle.find();
//     res.json(vehicles);
//   } catch (err) {
//     res.status(500).send();
//   }
// };

// exports.getGasById = async (req, res) => {
//   try {
//     const vehicle = await Vehicle.findById(req.params.id);
//     res.json(vehicle);
//   } catch (err) {
//     res.status(404).send();
//   }
// };

// exports.saveGas = async (req, res) => {
//   const vehicle = new Vehicle(req.body);
//   try {
//     const insertedVehicle = await Vehicle.save();
//     res.status(201).json(insertedVehicle);
//   } catch (err) {
//     res.status(404).send();
//   }
// };

// exports.updateGas = async (req, res) => {
//   try {
//     const updatedVehicle = await Vehicle.updateOne(
//       { _id: req.params.id },
//       { $set: req, body }
//     );
//     res.status(200).json(updatedVehicle);
//   } catch (err) {
//     res.status(404).send();
//   }
// };

// exports.deleteGas = async (req, res) => {
//   try {
//     const deletedVehicle = await Vehicle.deleteOne({ _id: req.params.id });
//     res.status(200).json(deletedVehicle);
//   } catch (err) {
//     res.status(404).send();
//   }
// };
