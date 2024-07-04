/* eslint-disable no-undef */
const nodemailer = require('nodemailer')

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

const passwordReset = (to, token) => {
    const mailOptions = {
      from: 'aidoomusah18ab0614@gmail.com',
      to: to,
      subject: 'Password Reset',
      text: `To reset the password clicking the following link But if this is not requested by You then you are free to ignore this : http://localhost:3000/new-password/${token} `

    };
 
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.error('Error sending email:', error);
        } else {
        console.log('Reset Email sent:', info.response);
        }
    });
}

module.exports = passwordReset;