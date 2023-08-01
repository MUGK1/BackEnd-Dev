const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/VIDLY", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to mongoDB...", err));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use("/api/genres", genres);
app.use("/api/customer", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
