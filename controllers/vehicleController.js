const Vehicle = require("../models/vehicleModel.js");

exports.getGas = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).send();
  }
};

exports.getGasById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    res.json(vehicle);
  } catch (err) {
    res.status(404).send();
  }
};

exports.saveGas = async (req, res) => {
  const vehicle = new Vehicle(req.body);
  try {
    const insertedVehicle = await Vehicle.save();
    res.status(201).json(insertedVehicle);
  } catch (err) {
    res.status(404).send();
  }
};

exports.updateGas = async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.updateOne(
      { _id: req.params.id },
      { $set: req, body }
    );
    res.status(200).json(updatedVehicle);
  } catch (err) {
    res.status(404).send();
  }
};

exports.deleteGas = async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedVehicle);
  } catch (err) {
    res.status(404).send();
  }
};
