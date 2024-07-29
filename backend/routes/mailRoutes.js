const express = require("express");
const router = express.Router();

const { sendEmail } = require("./mail");

router.post("/sendEmail", sendEmail);

module.exports = router;