const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    panCard: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    flightClass: {
      type: String,
      required: true,
    },

    departureDate: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
    status: {
      type: String,
      enum: ["Confirmed", "Not Confirmed"],
      default: "Not Confirmed",
    },
  },
  {
    timestamps: true,
  }
);

const Passenger = mongoose.model("Passenger", passengerSchema);

module.exports = Passenger;
