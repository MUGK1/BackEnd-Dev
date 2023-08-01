const { movieSchema } = require("../models/movie");
const { customerSchema } = require("../models/customer");
const Joi = require("joi");
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: customerSchema,
    require: true,
  },
  movie: {
    type: movieSchema,
    require: true,
  },
  dateOut: {
    type: Date,
    require: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;
