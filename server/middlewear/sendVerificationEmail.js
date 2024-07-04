const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    ignoreTLS: false,
    secure: false,
    auth: {
        user: "aidoomusah18ab0614@gmail.com",
        pass: "vpif nddd rnbv kmvw",
    },
});

const verifyEmail = (to, token) => {
    const mailOptions = {
      from: 'aidoomusah18ab0614@gmail.com',
      to: to,
      subject: 'Email Verification',
      text: `Please verify your email by clicking the following link: http://localhost:4000/api/verify/${token}`

    };
 
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.error('Error sending email:', error);
        } else {
        console.log('Email verification sent:', info.response);
        }
    });
}

module.exports = verifyEmail;