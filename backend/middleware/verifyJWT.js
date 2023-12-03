const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomError");
const User = require("../model/UserSchema");

const verifyJWT = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        const err = new CustomError("You are not logged in!", 401);
        return next(err);
    }
    // if (!authHeader) {
    //     const err = new CustomError("You are not logged in!", 401);
    //     next(err);
    // }
    // const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            const errorToken = new CustomError("You are not authorized", 403);
            return next(errorToken);
        }
        const isUser = await User.findOne({ _id: decoded?.id }).select({ username: 1, following: 1 });
        if (!isUser) {
            const userError = new CustomError("The user with the given token does not exist", 401);
            return next(userError);
        }
        req.decoded = isUser;
        next();
    })
}

module.exports = verifyJWT;