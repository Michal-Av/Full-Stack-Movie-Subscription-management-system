const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');

const moviesController = require('./controllers/moviesController');
const subscriptionsController = require('./controllers/subscriptionsController')
const membersController = require('./controllers/membersController')

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({extended : true}))
.use(bodyParser.json());

require('./configs/database');

app.use('/api/movies', moviesController);
app.use('/api/subscriptions', subscriptionsController);
app.use('/api/members', membersController);


app.listen(8080);
console.log("Server is running on port 8080");



