var mongoose = require('mongoose');

var mongoDB = 'mongodb://localhost:27017/birds';

mongoose.Promise = global.Promise;

mongoose.connect(mongoDB, { userNewUrlParser: true, useUnifiedTopology: true, checkServerIdentity: false });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));



