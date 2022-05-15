const Gas = require("../models/gasModel.js");

exports.getGas = async (req, res) => {
  try {
    const gas = await Gas.find();
    res.json(gas);
  } catch (err) {
    res.status(500).send();
  }
};

exports.getGasById = async (req, res) => {
  try {
    const gas = await Gas.findById(req.params.id);
    res.json(gas);
  } catch (err) {
    res.status(404).send();
  }
};

exports.saveGas = async (req, res) => {
  const gas = new Gas(req.body);
  try {
    const insertedGas = await Gas.save();
    res.status(201).json(insertedGas);
  } catch (err) {
    res.status(404).send();
  }
};

exports.updateGas = async (req, res) => {
  try {
    const updatedGas = await Gas.updateOne(
      { _id: req.params.id },
      { $set: req, body }
    );
    res.status(200).json(updatedGas);
  } catch (err) {
    res.status(404).send();
  }
};

exports.deleteGas = async (req, res) => {
  try {
    const deletedGas = await Gas.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedGas);
  } catch (err) {
    res.status(404).send();
  }
};
