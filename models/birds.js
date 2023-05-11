var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BirdSchema = new Schema(
    {
        createdAt : {type: Date, default : Date.now},
        observedAt : {type: Date},
        userName : {type: String},
        img: {type: String },
        description: {type: String },
        // createdAt : {type: Date, default : Date.now},
        // observedAt : {type: Date},
        // location : {
        //     lat: {type: Number},
        //     lng: {type: Number}
        // },
        
        // identification : {
        //     commonName: {type: String},
        //     scientificName: {type: String},
        //     description : {type: String},
        //     URI : {type: String}
        // },
        // img: {type: String },
        // userName : {type: String},
        // chat: {
        //     userName : {type: String},
        //     chat : {type: String},
        //     createdAt : {type: Date,},
           
        // }

    }
);

// Virtual for a character's age
// CharacterSchema.virtual('age')
//     .get(function () {
//         var currentDate = new Date().getFullYear();
//         var result= currentDate - this.dob;
//         return result;
//     });

BirdSchema.set('toObject', {getters: true, virtuals: true});

//On some combionations of Node and Mongoose only the following command works - in theory they should be equivalent
//CharacterSchema.set('toObject', {getters: true, virtuals: true});

// the schema is useless so far
// we need to create a model using it
var Bird = mongoose.model('Bird', BirdSchema);

// make this available to our users in our Node applications
module.exports = Bird;