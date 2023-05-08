const mongoose = require('mongoose');

const birdSchema = new mongoose.Schema({
    username: { type: String, required: true },
    photo: { type: String, required: true },
    observedAt: { type: Date, required: true },
    description: { type: String, required: true }
});

const Bird = mongoose.model('Bird', birdSchema);

module.exports = Bird;
