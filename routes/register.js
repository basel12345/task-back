const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { User, validateRegister } = require('../model/user');
const auth = require('../middleware/auth');
const router = express.Router();


/* ------------the route for get all users-------------- */
router.get("/getAllUsers",auth ,async (req, res) => {
    const Users = await User.find().select('username email');
    res.send(Users);
});


/* ------------the route for get user by id-------------- */
router.get("/getUserById/:id",auth ,async (req, res) => {
    /* search user for user id */
    const user = await User.findById(req.params.id).populate("devices");
    if (!user) return res.status(404).send("Not find this user");
    res.send(user);
});


/* ------------the route for register to user-------------- */
router.post("/registerUser", async(req, res) => {
    /* start validation by joi library */
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    /* end validation by joi library */


    /* Make sure this email valid*/
    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send("User already registered");
    user = await new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });

    /*----------Encrypt------------*/
    const salt = await bcrypt.genSalt(10);
    user['password'] = await bcrypt.hash(user['password'], salt);
    user['confirmPassword'] = await bcrypt.hash(user['confirmPassword'], salt);
    
    /*-----------token----------*/
    const token = jwt.sign({ _id: user._id},"jwtPrivateKey");

    await user.save((err, user) => {
        if(err) {
            return res.send({
                status: false,
                message: err.message
            });
        };
        return res.header('x-auth-token', token).send({
            status: true,
            message: "user register",
            user,
            token
        });
    })
})



module.exports = router;
  