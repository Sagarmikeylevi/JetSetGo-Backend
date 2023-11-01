const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    departureDestination: {
      type: String,
      required: true,
    },
    arrivalDestination: {
      type: String,
      required: true,
    },
    datesOfDeparture: [
      {
        type: Number,
        required: true,
      },
    ],
    timeOfDeparture: {
      type: String,
      required: true,
    },
    timeOfArrival: {
      type: String,
      required: true,
    },
    airline: {
      type: String,
      enum: ["Air India", "AirAsia", "IndiGo", "SpiceJet", "Vistara"],
      required: true,
    },
    seatsAvailable: {
      economy: {
        type: Number,
        required: true,
      },
      premiumEconomy: {
        type: Number,
        required: true,
      },
      business: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
