const nodemailer = require('nodemailer');
require("dotenv").config();

const sendEmail = async (msg_options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const emailOptions = {
        from: "Leogram support<support@leogram.com>",
        to: msg_options.email,
        subject: msg_options.subject,
        text: msg_options.message
    }

    await transporter.sendMail(emailOptions);
}

module.exports = sendEmail;