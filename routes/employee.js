const express = require('express');
const router = express.Router();

const passport = require('passport')

const employeeController = require('../controllers/employeeController')


router.post('/createEmployee', employeeController.createEmployee);

router.post('/create-session',passport.authenticate('local',
{failureRedirect:'/authorization'}), employeeController.createSession)

router.use('/dashboard', require('./dashboard'));


module.exports = router;