//require modules
const express = require('express');
const routes = express.Router();

//adminController
const adminController = require('./admin-controller');
const bikeController = require('../bikes/bikes-controller');

// admin get all users
routes.get('/users',adminController.Users);

// admin signup
routes.post('/signup',adminController.signup);

// admin login
routes.post('/login',adminController.login);

// admin add bikes
routes.post('/addBikes',bikeController.addBikes);


module.exports = routes;