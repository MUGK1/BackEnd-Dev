const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    minlength: 10,
    maxlength: 255,
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.SECRET_KEY,
  );
  return token;
};

const User = mongoose.model("User", userSchema);

const complexityOptions = {
  min: 8,
  max: 50,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

function validateUser(User) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(10).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(User);
}

exports.User = User;
exports.validate = validateUser;
exports.complexityOptions = complexityOptions;
