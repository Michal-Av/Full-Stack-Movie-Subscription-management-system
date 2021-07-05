const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');

const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
const permissionsController =require('./controllers/permissionsController');
const moviesController = require('./controllers/moviesController');
const subscriptionsController = require('./controllers/subscriptionsController')
const membersController = require('./controllers/membersController')

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({extended : true}))
.use(bodyParser.json());

require('./configs/database');

app.use('/api/users', usersController);
app.use('/api/login', loginController);
app.use('/api/permissions', permissionsController);
app.use('/api/movies', moviesController);
app.use('/api/subscriptions', subscriptionsController);
app.use('/api/members', membersController);


app.listen(8000);
console.log("Server is running on port 8000");



