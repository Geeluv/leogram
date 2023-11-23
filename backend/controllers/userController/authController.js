const jwt = require("jsonwebtoken");
const User = require("../../model/UserSchema");
const bcrypt = require("bcryptjs");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const CustomError = require("../../utils/CustomError");
const salt = bcrypt.genSaltSync(10);

// require("dotenv").config()

exports.registerUser = asyncErrorHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await User.create({ username, email, password: hash });
    res.status(200).json({ username: newUser.username });
})

exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email }).select("+password");
    if (!isUser) {
        const err = new CustomError("Invalid credentials, try again", 400);
        return next(err);
    }
    const isMatch = bcrypt.compareSync(password, isUser.password);
    if (isMatch) {
        const token = jwt.sign({ username: isUser.username, id: isUser._id }, process.env.JWT_SECRET, { expiresIn: "60m" });
        res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 30 * 60 * 1000 }).status(200).json({
            username: isUser.username,
            message: "You are now logged in.",
            token
        });
    } else {
        const err = new CustomError("Invalid credentials", 400);
        return next(err)
    }
})

exports.logoutUser = (req, res) => {
    res.clearCookie("token", "", { httpOnly: true, secure: true, maxAge: 60 * 1000 }).status(200).json({ message: "Logged out!" });
}