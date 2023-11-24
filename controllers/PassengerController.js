const Passenger = require("../models/Passenger");

module.exports.addPassenger = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      full_name,
      date_of_birth,
      gender,
      nationality,
      panCard,
      phone,
      email,
      departureDest,
      arrivalDest,
      flightClass,
      departureTime,
      arrivalTime,
      departureDate,
      price,
    } = req.body;

    // Create a new passenger instance
    const newPassenger = new Passenger({
      full_name,
      date_of_birth,
      gender,
      nationality,
      panCard,
      phone,
      email,
      departureDest,
      arrivalDest,
      flightClass,
      departureTime,
      arrivalTime,
      departureDate,
      price,
    });

    // Save the passenger to the database
    await newPassenger.save();

    // Send a success response
    res
      .status(201)
      .json({ message: "Passenger created successfully", data: newPassenger });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.getPassenger = async (req, res) => {
  try {
    const passengerId = req.params.id; // Assuming the passenger ID is passed in the URL parameters

    // Find the passenger by ID
    const passenger = await Passenger.findById(passengerId);

    // Check if the passenger exists
    if (!passenger) {
      return res.status(404).json({ message: "Passenger not found" });
    }

    // Send the passenger data in the response
    res.status(200).json({ data: passenger });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.confirmPassenger = async (req, res) => {
  try {
    const passengerId = req.params.id;

    const passenger = await Passenger.findByIdAndUpdate(
      passengerId,
      { status: "Confirmed" },
      { new: true }
    );

    if (!passenger) {
      return res.status(404).json({ message: "Passenger not found" });
    }

    res.status(200).json({ message: "Passenger confirmed", data: passenger });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
