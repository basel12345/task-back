const express = require('express');
const { User } = require('../model/user');
const { Device, valiateNameDevice, valiateDataDevice } = require('../model/devices');
const auth = require('../middleware/auth');
const router = express.Router();

/* ------------the route for get all devices-------------- */
router.get('/getAllDevices',auth ,async(req, res) => {
    const devices = await Device.find();
    res.send(devices);
});

/* ------------the route for add device-------------- */
router.post('/addDevice/:userId',auth ,async(req, res) => {
     /* search user for user id */
     const user = await User.findById(req.params.userId);
     if (!user) return res.status(404).send("Not find this user");

    /* start validation by joi library */
    const { error } = valiateNameDevice(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    /* end validation by joi library */

    const newDevice = new Device({
        name: req.body.name
    });

    await newDevice.save((err, device) => {
        if(err) {
            return res.send({
                status: false,
                message: err.message,
            });
        }
        return res.send({
            status: true,
            message: "Device saved",
            device,
        });
    });

    user['devices'].push(newDevice);
    await user.save();
});


/* ------------the route for add data for device-------------- */
router.post('/addDataDevice/:id',auth ,async(req, res) => {

     /* start validation by joi library */
     const { error } = valiateDataDevice(req.body);
     if (error) return res.status(400).send(error.details[0].message);
     /* end validation by joi library */

    const device = await Device.findByIdAndUpdate(
        req.params.id,
        {
            price: req.body.price,
            description: req.body.description
        },
        { new: true }
    );

    /* Check the id device */
    if (!device) return res.status(404).send("Not find this device");

     await device.save((err, data) => {
        if(err) {
            return res.send({
                status: false,
                message: err.message,
            });
        }
        return res.send({
            status: true,
            message: "Device saved",
            data,
        });
     });
})

module.exports = router;