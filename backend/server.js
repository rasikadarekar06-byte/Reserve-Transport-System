const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/reserveTransport", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Vehicle Schema
const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  transportType: { type: String, required: true },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  bookingDate: { type: Date, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

// Get all vehicles
app.get("/api/vehicles", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all bookings (populate vehicle details)
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("vehicleId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Book a vehicle
app.post("/api/book/:vehicleId", async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, bookingDate } = req.body;
    if (!customerName || !customerEmail || !customerPhone || !bookingDate) {
      return res.status(400).json({ message: "All customer details are required" });
    }

    const booking = new Booking({
      vehicleId: req.params.vehicleId,
      customerName,
      customerEmail,
      customerPhone,
      bookingDate: new Date(bookingDate), // convert string to Date
    });

    await booking.save();
    res.json({ message: "Booked successfully", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
