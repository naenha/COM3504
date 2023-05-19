var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BirdSchema = new Schema(
    {
        createdAt : {type: Date, default : Date.now},
        birdName : {type: String},
        observedAt : {type: Date},
        userName : {type: String},
        description: {type: String},
        img: {type: String },
        latDisplay: {type: Number},
        lngDisplay: {type: Number},
    }
);


BirdSchema.set('toObject', {getters: true, virtuals: true});

var Bird = mongoose.model('Bird', BirdSchema);

module.exports = Bird;