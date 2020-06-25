const express = require('express');
const router = express.Router();

const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxe5294d5c1b3c44f0a3a3ff4435211fef.mailgun.org';
const API_KEY = '72609374f9efbbcfb475f69d843d9c90-1b6eb03d-b4162b31';
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

router.post("/sendMovieReminder", auth, (req, res) => {
    const data = {
        from: 'whatnext-platform@abv.bg',
        to: `${req.body.userEmail}`,
        subject: 'Напомняне за нов филм',
        text: `Здравейте, напомняме ви че утре ${req.body.movieReleaseDate} излиза премиерата на филма "${req.body.movieTitle}"! Поздрави, екип SWN!`
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
        console.log(req.body);
    });
});

router.post("/sendGameReminder", auth, (req, res) => {
    const data = {
        from: 'whatnext-platform@abv.bg',
        to: `${req.body.userEmail}`,
        subject: 'Напомняне за нова игра',
        text: `Здравейте, напомняме ви че утре ${req.body.gameReleaseDate} излиза новата игра "${req.body.gameTitle}"! Поздрави, екип SWN!`
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
        console.log(req.body);
    });
});

module.exports = router;
