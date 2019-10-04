//require modules
const express = require('express');
const passport = require('passport');
const routes = express.Router();
const checkAuth = require('../authentication/check-auth');

//adminController
const adminController = require('./admin-controller');
const bikeController = require('../bikes/bikes-controller');

// admin get all users
routes.get('/users',checkAuth,adminController.Users);

// admin signup
routes.post('/signup',adminController.signup);

// admin login
routes.post('/login',adminController.login);

// admin add bikes
routes.post('/addBikes',checkAuth,bikeController.addBikes);

// get bikes
routes.get('/getBikes',checkAuth,bikeController.getAllBikesForAdmin);

// get only a single bike
routes.get('/getBikes/:bikeId',checkAuth,bikeController.getBikes);

// delete bikes
routes.delete('/getBikes/:bikeId',checkAuth,bikeController.deleteBikes);

// update bikes
routes.put('/updateBikes/:bikeId',checkAuth,bikeController.updateBikes);


module.exports = routes;