const Joi = require("@hapi/joi");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: Number,
    description: String
});

const Device = mongoose.model('Device', deviceSchema);

// validation for name Device  
function valiateNameDevice(Device) {
    const schema = Joi.object({
        name: Joi.string().required()
    });
    return schema.validate(Device);
}

// validation for data Device  
function valiateDataDevice(Device) {
    const schema = Joi.object({
        price: Joi.number().required(),
        description: Joi.string().required()
    });
    return schema.validate(Device);
}

exports.Device = Device;
exports.valiateNameDevice = valiateNameDevice;
exports.valiateDataDevice = valiateDataDevice;