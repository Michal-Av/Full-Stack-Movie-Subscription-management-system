const mongoose = require('mongoose');

let schema =  mongoose.Schema;

let MemberSchema = new schema({
    name : String,
    email : String,
    city : String,
});

module.exports =  mongoose.model('members',MemberSchema);
