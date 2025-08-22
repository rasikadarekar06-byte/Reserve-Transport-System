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
      bookingDate: new Date(bookingDate), // Convert to Date
    });

    await booking.save();
    res.json({ message: "Booked successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
