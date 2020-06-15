const express = require('express');
const router = express.Router();
const { WatchLater } = require("../models/WatchLater");

const { auth } = require("../middleware/auth");

//=================================
//             WatchLater
//=================================


router.post("/watchLaterNumber", auth, (req, res) => {
    WatchLater.find({"movieId": req.body.movieId})
        .exec((err, later) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({success: true, watchLaterNumber: later.length})
        })
});

router.post("/towatchlater", auth, (req, res) => {
    WatchLater.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
        .exec((err, towatchlater) => {
            if(err) return res.status(400).send(err);

            let result = false;
            if(towatchlater.length !== 0){
                result = true;
            }

            res.status(200).json({success: true, towatchlater: result})
        })
});

router.post("/addToWatchLater", auth, (req, res) => {
    const watchLater = new WatchLater(req.body)
    watchLater.save((err, doc) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
});

router.post("/removeFromWatchLater", auth, (req, res) => {
    WatchLater.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if (err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true, doc})
        })
});

router.post("/getToWatchLaterMovie", (req, res) => {
    WatchLater.find({'userFrom': req.body.userFrom})
        .exec((err, toWatchLater) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success: true, toWatchLater})
        })
});

module.exports = router;
