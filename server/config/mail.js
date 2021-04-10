const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'jonasmandy28@gmail.com',
        pass: 'martha@123'
    }
});

module.exports = transport;