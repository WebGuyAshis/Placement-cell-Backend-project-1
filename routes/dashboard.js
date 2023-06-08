const express = require('express');
const router = express.Router();

const passport = require('passport');

const dashboardController = require('../controllers/dashboardController');


router.get('/',passport.checkAuthentication, dashboardController.home);

module.exports = router;