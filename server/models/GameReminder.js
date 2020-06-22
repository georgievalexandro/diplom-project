const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    gameId: {
        type: String
    },
    gameTitle: {
        type: String
    },
    gameReleaseDate: {
        type: String
    }
})


const GameReminder = mongoose.model('GameReminder', reminderSchema);

module.exports = { GameReminder }