const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        minlength: [4, "Username must have at least 4 characters"],
        maxlength: [12, "Username must not have more than 12 characters"]
    },
    image: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    profileimage: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);