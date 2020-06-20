const express = require('express');
const router = express.Router();

const mailgun = require("mailgun-js");
const DOMAIN = 'YOUR_DOMAIN';
const API_KEY = 'YOUR_API_KEY';
const mg = mailgun({apiKey: API_KEY, domain: DOMAIN});

const { auth } = require("../middleware/auth");

router.post("/sendNotification", auth, (req, res) => {
    const data = {
        from: `${req.body.userEmail}`,
        to: 'YOUR_MAIL',
        subject: 'Изтриване на акаунт',
        text: `${req.body.userMessage}`
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
        console.log(req.body);
    });
});

module.exports = router;
