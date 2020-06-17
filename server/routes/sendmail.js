const express = require('express');
const router = express.Router();

const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxcfc7c1789d78471492ded28319299411.mailgun.org';
const API_KEY = 'aab76326055ce1897fc425acc6cdc5cd-1b6eb03d-7dd2bdd0';
const mg = mailgun({apiKey: API_KEY, domain: DOMAIN});

const { auth } = require("../middleware/auth");

router.post("/sendNotification", auth, (req, res) => {
    const data = {
        from: `${req.body.userEmail}`,
        to: 'georgievalexandro@gmail.com',
        subject: 'Изтриване на акаунт',
        text: `${req.body.userMessage}`
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
        console.log(req.body);
    });
});

module.exports = router;