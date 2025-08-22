const express = require('express');
const Vehicle = require('../models/Vehicle');
const router = express.Router();
router.get('/', async (req, res) => {
    try { const vehicles = await Vehicle.find(); res.json(vehicles); } 
    catch (err) { res.status(500).json({ message: err.message }); }
});
router.post('/', async (req, res) => {
    const vehicle = new Vehicle(req.body);
    try { const savedVehicle = await vehicle.save(); res.status(201).json(savedVehicle); } 
    catch (err) { res.status(400).json({ message: err.message }); }
});
module.exports = router;