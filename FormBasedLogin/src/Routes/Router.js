const express = require('express')
const router = express.Router()
require('../db/Connection')
const securePass = require('../Services/SecurePassword')
const User = require('../models/User')

router.get('/', (req, res) => {
    res.render('index')
})

router.get("/register", (req, res) => {
    res.render('register')
})

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ email: req.body.email });
        if (await securePass.CheckPassword(req.body.password, userData.password)) {
            // const token=await userData.GenarateToken();

            res.status(200).redirect('http://localhost:3000/')
        }
        else
            res.status(404).json({ message: "Invalid Credentails" })
    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error);
    }
});

router.post('/register', async (req, res) => {
    try {
        if (req.body.cpassword === req.body.password) {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // const token = await user.GenarateToken();
            // console.log(token);

            const result = await user.save();
            console.log(result);
            res.status(201).render('index')
        }
        else {
            res.status(400).json({ message: "Confim Password doesnt match" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
        console.log(error);
    }
})

module.exports = router

