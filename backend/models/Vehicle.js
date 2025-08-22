const mongoose = require('mongoose');
const vehicleSchema = new mongoose.Schema({
    type: { type: String, enum: ['bus', 'train', 'cab', 'auto', 'flight'], required: true },
    name: { type: String, required: true },
    seats: { type: Number, required: true },
    fare: { type: Number, required: true }
});
module.exports = mongoose.model('Vehicle', vehicleSchema);