const express = require('express');
const router = express.Router();
const { GameReminder } = require("../models/GameReminder");

const { auth } = require("../middleware/auth");

//=================================
//             Game Reminder
//=================================


router.post("/addGameReminder", auth, (req, res) => {
    const gameReminder = new GameReminder(req.body)
    gameReminder.save((err, doc) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
});

router.post("/removeReminder", auth, (req, res) => {
    GameReminder.findOneAndDelete({gameId: req.body.gameId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if (err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true, doc})
        })
});

router.post("/getGameReminders", auth, (req, res) => {
    GameReminder.find({'gameReleaseDate': req.body.oneDayEarlier})
        .exec((err, gamereminders) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success: true, gamereminders})
        })
});

module.exports = router;
