const CustomError = require("../utils/CustomError");
// const devErrors = (res, error) => {
//     res.status(error.statusCode).json({
//         status: error.statusCode,
//         message: error.message,
//         stackTrace: error.stack,
//         error: error
//     })
// }

// const prodErrors = (res, error) => {
//     if (error.isOperational) {
//         res.status(error.statusCode).json({
//             status: error.statusCode,
//             message: error.message
//         })
//     } else {
//         res.status(500).json({
//             status: "error",
//             message: "Something went wrong! Please try again later."
//         })
//     }
// }
function castErrorHandler(err) {
    const msg = `Invalid value for ${err.path}: ${err.path}`;
    return new CustomError(msg, 400)
}

function duplicateErrorHandler(err) {
    const value = Object.values(err.keyValue)
    const msg = `${value} has already been taken`;
    return new CustomError(msg, 400)
}

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    if (error.name === "CastError") {
        error = castErrorHandler(error)
    }
    if (error.code === 11000) {
        error = duplicateErrorHandler(error)
    }
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
    })

    // if (process.env.NODE_ENV === "development") {
    //     devErrors(res, error);
    // }
    // if (process.env.NODE_ENV === "production") {
    //     prodErrors(res, error);
    // }

}