const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  transportType: { type: String, required: true }, // bus, train, cab, auto, flight
  seats: { type: Number, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
