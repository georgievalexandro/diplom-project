const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOpinionSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    }
})


const UserOpinion = mongoose.model('UserOpinion', userOpinionSchema);

module.exports = { UserOpinion }