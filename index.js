const Joi = require('joi');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const genres = require('./routes/genres');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use('/api/genres', genres);

const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})



