// require modules
const express = require('express');
const routes = express.Router();

//user controller
const userController = require('./user-controller');


//bike controller 
const bikeController = require('../bikes/bikes-controller');


// user signup route
routes.post('/signup',userController.signup);

//user login route
routes.post('/login',userController.login);

//get all bikes
routes.get('/bikes',bikeController.getAllBikes);

module.exports = routes;
