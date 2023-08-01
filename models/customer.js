const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    require: true,
    minlength: 9,
    maxlength: 10,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(9).max(10).required(),
  });
  return schema.validate(customer);
}

exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.validate = validateCustomer;
