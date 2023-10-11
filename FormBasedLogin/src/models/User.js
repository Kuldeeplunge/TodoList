
const mongoose = require('mongoose')
const securePass = require("../Services/SecurePassword")
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});

userSchema.methods.GenarateToken = async function () {
    try {
        const token = await jwt.sign({ _id: this.id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token })
        this.save();
        return token;
    } catch (error) {
        console.log(error);
        return res.send("Token Error")
    }
}


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await securePass.HashPassword(this.password)
    }
    next();
})

const User = new mongoose.model("User", userSchema);
module.exports = User