const express = require('express');
const router = express.Router();
const { FavoriteGame } = require("../models/FavoriteGame");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite Game
//=================================

router.post("/favorited", auth, (req, res) => {
    FavoriteGame.find({"gameId": req.body.gameId, "userFrom": req.body.userFrom})
        .exec((err, favorite) => {
            if(err) return res.status(400).send(err);

            let result = false;
            if(favorite.length !== 0){
                result = true;
            }

            res.status(200).json({success: true, favorited: result})
        })
});

router.post("/addToFavorite", auth, (req, res) => {
    const favorite = new FavoriteGame(req.body)
    favorite.save((err, doc) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
});

router.post("/removeFromFavorite", auth, (req, res) => {
    FavoriteGame.findOneAndDelete({gameId: req.body.gameId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if (err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true, doc})
        })
});

router.post("/getFavoriteGame", (req, res) => {
    FavoriteGame.find({'userFrom': req.body.userFrom})
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success: true, favorites})
        })
});

module.exports = router;
