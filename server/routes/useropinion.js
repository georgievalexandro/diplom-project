const express = require('express');
const router = express.Router();
const { UserOpinion } = require("../models/UserOpinion");

const { auth } = require("../middleware/auth");

//=================================
//             UserOpinion
//=================================


router.post("/addOpinion", (req, res) => {
    const userOpinion = new UserOpinion(req.body)
    userOpinion.save((err, doc) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
});

router.post("/getOpinions", (req, res) => {
    UserOpinion.find()
        .exec((err, opinions) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success: true, opinions})
        })
});

module.exports = router;
