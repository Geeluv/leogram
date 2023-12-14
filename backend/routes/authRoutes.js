const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/userController/authController");
const { resetPassword, updatePassword } = require("../controllers/userController/userController");


router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.get("/logout", logoutUser);
router.post("/reset-password", resetPassword);
router.put("/reset-password/:token", updatePassword);

module.exports = router;