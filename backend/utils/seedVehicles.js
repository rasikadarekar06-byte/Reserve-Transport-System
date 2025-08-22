import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Vehicle schema
const vehicleSchema = new mongoose.Schema({
    name: String,
    transportType: String,
    seats: Number,
    price: Number,
    available: { type: Boolean, default: true }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

// API to get vehicles by transport type
app.get("/vehicles/:type", async (req, res) => {
    try {
        const type = req.params.type;
        const vehicles = await Vehicle.find({ transportType: type, available: true });

        if (!vehicles.length) {
            return res.status(404).json({ message: "No vehicle available for selected transport." });
        }
        res.json(vehicles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// API to add vehicles (seed)
app.post("/vehicles", async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: "Error adding vehicle" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
