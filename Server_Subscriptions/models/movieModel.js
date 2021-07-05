const mongoose = require('mongoose');

let schema =  mongoose.Schema;

let MovieSchema = new schema({
    name : String,
    genres : [String],
    image : String,
    premiered : Date
});

module.exports =  mongoose.model('movies',MovieSchema);
