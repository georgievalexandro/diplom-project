const express = require('express');
const router = express.Router();
const { MovieReminder } = require("../models/MovieReminder");

const { auth } = require("../middleware/auth");

//=================================
//             Movie Reminder
//=================================


router.post("/addMovieReminder", auth, (req, res) => {
    const movieReminder = new MovieReminder(req.body)
    movieReminder.save((err, doc) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
});

router.post("/removeReminder", auth, (req, res) => {
    MovieReminder.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if (err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true, doc})
        })
});

module.exports = router;
