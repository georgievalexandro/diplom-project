const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteGameSchema = mongoose.Schema({
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
    },
    gameGenre: {
        type: Array
    },
    preferedPlatform: {
        type: Array
    }
})


const FavoriteGame = mongoose.model('FavoriteGame', favoriteGameSchema);

module.exports = { FavoriteGame }