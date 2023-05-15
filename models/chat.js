var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChatSchema = new Schema(
    {
        createdAt : {type: Date, default : Date.now},
        userName : {type: String},
        chat : {type: String},
        birdId : {type: String}
    
    }
);

// Virtual for a character's age
// CharacterSchema.virtual('age')
//     .get(function () {
//         var currentDate = new Date().getFullYear();
//         var result= currentDate - this.dob;
//         return result;
//     });

ChatSchema.set('toObject', {getters: true, virtuals: true});

var Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
