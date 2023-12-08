const express = require("express");
const router = express.Router();
const { getUser } = require("../controllers/userController/authUser");
const { fetchAllUsers, followUser, resetPassword } = require("../controllers/userController/userController");

router.get("/user", getUser);
router.get("/find-friends", fetchAllUsers);
router.post("/follow-user", followUser);
router.post("/reset-password", resetPassword);

module.exports = router;