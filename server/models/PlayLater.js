const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playLaterSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    gameId: {
        type: String
    },
    gameTitle: {
        type: String
    },
    gameImage: {
        type: String
    },
    gameReleaseDate: {
        type: String
    }
})


const PlayLater = mongoose.model('PlayLater', playLaterSchema);

module.exports = { PlayLater }