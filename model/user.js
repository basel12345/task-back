const Joi = require("@hapi/joi");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    devices: [
        {
          type: Schema.Types.ObjectId,
          ref: "Device",
        },
      ],
});

const User = mongoose.model('User', userSchema);


// validation for register
function validateRegister(register) {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string()
          .regex(/^[a-zA-Z0-9]{3,30}$/)
          .required(),
        confirmPassword: Joi.any()
          .valid(Joi.ref("password"))
          .required()
    })
    return schema.validate(register);
}

// validation for login
function validateLogin(login) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
          .regex(/^[a-zA-Z0-9]{3,30}$/)
          .required(),
    })
    return schema.validate(login);
}


exports.User = User;
exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin; 