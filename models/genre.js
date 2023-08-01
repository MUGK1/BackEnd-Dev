const Joi = require("joi");
import mongoose from "mongoose";


const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
})


const Genre = mongoose.model('Genre', genreSchema)


function validateGenres(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(genre);
}


exports.Genre = Genre;
exports.validate = validateGenres;
