require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const CustomError = require("./utils/CustomError");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const getUserRoute = require("./routes/getUserRoute");
const commentRoutes = require("./routes/commentRoutes");
const verifyJWT = require("./middleware/verifyJWT");

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect("mongodb://127.0.0.1:27017/leogram")
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.log(err.message));

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/leogram/users/", userRoutes);
app.use(verifyJWT);
app.use("/leogram/users/", getUserRoute);
app.use("/leogram/users/", postRoutes);
app.use("/leogram/users/post", commentRoutes);

app.all("*", (req, res, next) => {
    const err = new CustomError(`Couldn't find ${req.originalUrl} in the server`, 404);
    next(err);
})

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server UP! Port ${PORT}.`);
})