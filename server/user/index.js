// require modules
const express = require('express');
const routes = express.Router();
const checkAuth = require('../authentication/check-auth');

//user controller
const userController = require('./user-controller');


//bike controller 
const bikeController = require('../bikes/bikes-controller');

//dashboard
routes.get('/',userController.dashboard);

// user signup route
routes.post('/signup',userController.signup);

//user login route
routes.post('/login',userController.login);

//user update details
routes.put('/update/:userId',checkAuth,userController.update);

//get all bikes
routes.get('/bikes',checkAuth,bikeController.getAllBikes);

module.exports = routes;
