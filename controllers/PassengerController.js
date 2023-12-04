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
      flightClass,
      departureDate,
      price,
      flightId,
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
      flightClass,
      departureDate,
      price,
      flightId,
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

module.exports.getAllPassengers = async (req, res) => {
  try {
    // Retrieve all passengers from the database
    const passengers = await Passenger.find();

    // Send the list of passengers as a response
    res.status(200).json({ data: passengers });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getPassengerById = async (req, res) => {
  try {
    // Extract passenger id from request parameters
    const passengerId = req.params.id;

    // Retrieve the passenger from the database by ID
    const passenger = await Passenger.findById(passengerId);

    // Check if the passenger with the given ID exists
    if (!passenger) {
      return res.status(404).json({ message: "Passenger not found" });
    }

    // Send the passenger data as a response
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

module.exports.deleteById = async (req, res) => {
  try {
    // Extract passenger id from request parameters
    const passengerId = req.params.id;

    // Delete the passenger from the database by ID
    const deletedPassenger = await Passenger.findByIdAndDelete(passengerId);

    // Check if the passenger with the given ID exists
    if (!deletedPassenger) {
      return res.status(404).json({ message: "Passenger not found" });
    }

    // Send a success response
    res.status(200).json({
      message: "Passenger deleted successfully",
      data: deletedPassenger,
    });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
