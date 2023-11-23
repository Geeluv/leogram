const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/userController/authController")


router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.get("/logout", logoutUser);

module.exports = router;