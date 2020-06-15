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
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    movieReleaseDate: {
        type: String
    }
})


const MovieReminder = mongoose.model('MovieReminder', reminderSchema);

module.exports = { MovieReminder }