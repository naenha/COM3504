var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChatSchema = new Schema(
    {
        createdAt : {type: Date, default : Date.now},
        userName : {type: String},
        comment : {type: String},

        // id of the bird page
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

var Chat = mongoose.model('Bird', BirdSchema);

module.exports = Chat;