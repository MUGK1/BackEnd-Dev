const { genreSchema } = require("./genre");
const Joi = require("joi");
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 50,
  },
  genre: {
    type: genreSchema,
    require: true,
  },
  numberInStock: {
    type: Number,
    require: true,
    minlength: 0,
    maxlength: 255,
  },
  dailyRentalRate: {
    type: Number,
    require: true,
    minlength: 0,
    maxlength: 255,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  });
  return schema.validate(movie);
}

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validate = validateMovie;
