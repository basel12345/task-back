const express = require("express");
const cors = require('cors');
const register = require('../routes/register');
const auth = require('../routes/auth');
const devices = require('../routes/devices');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(cors());
    app.use(express.json());
    app.use("/register", register);
    app.use("/auth", auth);
    app.use("/devices", devices);
    app.use(error)
}