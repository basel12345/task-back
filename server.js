require("express-async-errors");
const express = require('express');
const app = express();


require('./startup/routes')(app);
require('./startup/db')();


const port = process.env.Port || 3000;
const server = app.listen(port, () => console.log(`http://localhost:${port}`));

module.exports = server;