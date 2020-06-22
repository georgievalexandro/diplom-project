const express = require('express');
const router = express.Router();
const { PlayLater } = require("../models/PlayLater");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite Game
//=================================

router.post("/chosedToPlayLater", auth, (req, res) => {
    PlayLater.find({"gameId": req.body.gameId, "userFrom": req.body.userFrom})
        .exec((err, chosen) => {
            if(err) return res.status(400).send(err);

            let result = false;
            if(chosen.length !== 0){
                result = true;
            }

            res.status(200).json({success: true, chosen: result})
        })
});

router.post("/addToPlayLater", auth, (req, res) => {
    const playlater = new PlayLater(req.body)
    playlater.save((err, doc) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
});

router.post("/removeFromPlayLater", auth, (req, res) => {
    PlayLater.findOneAndDelete({gameId: req.body.gameId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if (err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true, doc})
        })
});

router.post("/getPlayLaterGame", (req, res) => {
    PlayLater.find({'userFrom': req.body.userFrom})
        .exec((err, playlater) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success: true, playlater})
        })
});

module.exports = router;
