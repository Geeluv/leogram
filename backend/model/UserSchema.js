const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

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
    banner_image: String,
    country: String,
    state: String,
    leo_level: {
        type: String,
        enum: ["Spartan", "Rookie", "Avengers"],
        default: "Rookie"
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    bio: {
        type: String,
        default: "Leogram is a place to be"
    },
    pwdResetToken: String,
    pwdResetTokenExp: Date,

}, { timestamps: true });

UserSchema.methods.passwordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.pwdResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.pwdResetTokenExp = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model("User", UserSchema);