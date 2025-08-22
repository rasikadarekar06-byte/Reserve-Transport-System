// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  bookingDate: { type: Date, required: true }, // MUST be Date
});

module.exports = mongoose.model("Booking", bookingSchema);
