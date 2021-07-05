const mongoose = require('mongoose');

let schema =  mongoose.Schema;

let SubscriptionsSchema = new schema({
    memberID : String,
    movies : [Object],
});

module.exports =  mongoose.model('subscriptions',SubscriptionsSchema);
