const User = require("../../model/UserSchema");

exports.getUser = (req, res, next) => {
    res.status(200).json(req.decoded);
}