//const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com" ,
  port: "587",
  secure: false, // true for 465, false for other ports
  auth: {
    user: "plexmongodatabase@gmail.com", // generated ethereal user
    pass: "1Ilis2004Ilis1", // generated ethereal password
  },
});

const sendEmail = (req, res) => {
  const { email, subject, message } = req.body;
  console.log(email, subject, message);

  var mailOptions = {
    from: "plexmongodatabase@gmail.com",
    to: email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
};

module.exports = { sendEmail };