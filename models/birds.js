var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ChatSchema = new Schema({
        username: { type: String },
        message: { type: String },
        times: { type: Date, default: Date.now }
});
var BirdSchema = new Schema(
    {
        createdAt : {type: Date, default : Date.now},
        birdName : {type: String, max: 50},
        observedAt : {type: Date},
        userName : {type: String, max: 50},
        img: {type: String },
        description: {type: String },
        chatMessages: [ChatSchema]
    }
);


BirdSchema.set('toObject', {getters: true, virtuals: true});

//On some combionations of Node and Mongoose only the following command works - in theory they should be equivalent
//CharacterSchema.set('toObject', {getters: true, virtuals: true});

// the schema is useless so far
// we need to create a model using it
var Bird = mongoose.model('Bird', BirdSchema);
var Chat = mongoose.model('Chat', ChatSchema)

// make this available to our users in our Node applications
module.exports = Bird;
module.exports = Chat;