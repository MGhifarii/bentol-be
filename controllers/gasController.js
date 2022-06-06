const asyncHandler = require("express-async-handler");
const Gas = require("../models/gasModel.js");

// @desc    Get gas
// @route   GET /api/v1/gas
// @acces   Public
exports.getGas = asyncHandler(async (req, res) => {
  const gas = await Gas.find();

  res.status(200).json(gas);
});

// @desc    Get gas
// @route   GET /api/v1/gas/:id
// @acces   Public
exports.getGasById = asyncHandler(async (req, res) => {
  const gas = await Gas.findById(req.params.id);

  res.status(200).json(gas);
});

// @desc    Set gas
// @route   POST /api/v1/gas
// @access  Public
exports.setGas = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  if (!req.body) {
    res.status(400);
    throw new Error("Please fill in all field");
  }

  const gas = await Gas.create({
    name: name,
    price: price,
  });

  res.status(200).json(gas);
});

// @desc    Update gas
// @route   PUT /api/v1/gas/:id
// @access  Public
exports.updateGas = asyncHandler(async (req, res) => {
  const gas = await Gas.findById(req.params.id);

  if (!gas) {
    res.status(400);
    throw new Error("Gas not found");
  }

  const updatedGas = await Gas.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGas);
});

// @desc    Delete gas
// @route   DELETE /api/v1/gas/:id
// @access  Public
exports.deleteGas = asyncHandler(async (req, res) => {
  const gas = await Gas.findById(req.params.id);

  if (!gas) {
    res.status(400);
    throw new Error("Gas not found");
  }

  await gas.remove();

  res.status(200).json({ id: req.params.id });
});

// exports.getGas = async (req, res) => {
//   try {
//     const gas = await Gas.find();
//     res.json(gas);
//   } catch (err) {
//     res.status(500).send();
//   }
// };

// exports.getGasById = async (req, res) => {
//   try {
//     const gas = await Gas.findById(req.params.id);
//     res.json(gas);
//   } catch (err) {
//     res.status(404).send();
//   }
// };

// exports.saveGas = async (req, res) => {
//   const gas = new Gas(req.body);
//   try {
//     const insertedGas = await Gas.save();
//     res.status(201).json(insertedGas);
//   } catch (err) {
//     res.status(404).send();
//   }
// };

// exports.updateGas = async (req, res) => {
//   try {
//     const updatedGas = await Gas.updateOne(
//       { _id: req.params.id },
//       { $set: req, body }
//     );
//     res.status(200).json(updatedGas);
//   } catch (err) {
//     res.status(404).send();
//   }
// };

// exports.deleteGas = async (req, res) => {
//   try {
//     const deletedGas = await Gas.deleteOne({ _id: req.params.id });
//     res.status(200).json(deletedGas);
//   } catch (err) {
//     res.status(404).send();
//   }
// };
