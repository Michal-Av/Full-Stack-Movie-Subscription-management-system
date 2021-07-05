const mongoose = require('mongoose');

let schema =  mongoose.Schema;

let LoginSchema = new schema({
    userName : String,
    password : String,
    userID : String,
});

module.exports =  mongoose.model('users',LoginSchema);
