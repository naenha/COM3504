var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChatSchema = new Schema(
    {
        createdAt : {type: Date, default : Date.now},
        userName : {type: String},
        message : {type: String},
        birdId : {type: String}
    
    }
);

ChatSchema.set('toObject', {getters: true, virtuals: true});

var Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
