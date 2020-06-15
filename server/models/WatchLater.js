const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchLaterSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    movieImage: {
        type: String
    },
    movieRunTime: {
        type: String
    },
    movieReleaseDate: {
        type: String
    }
})


const WatchLater = mongoose.model('WatchLater', watchLaterSchema);

module.exports = { WatchLater }