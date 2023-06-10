const express = require('express');
const router = express.Router();

const passport = require('passport')

const employeeController = require('../controllers/employeeController')


router.post('/createEmployee', employeeController.createEmployee);

router.post('/create-session',passport.authenticate('local',
{failureRedirect:'/authorization'}), employeeController.createSession)

router.use('/dashboard', require('./dashboard'));

router.get('/sign-out', employeeController.destroySession)

router.get('/students-page', employeeController.studentsPage)


router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/authorization'}), employeeController.createSession)

module.exports = router;