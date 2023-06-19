const express = require('express');
const router = express.Router();

const passport = require('passport')

const employeeController = require('../controllers/employeeController');
const studentController = require('../controllers/studentController');
const companyController = require('../controllers/companyController');
const interviewController = require('../controllers/interviewController')


router.post('/createEmployee', employeeController.createEmployee);

router.post('/create-session',passport.authenticate('local',
{failureRedirect:'/authorization'}), employeeController.createSession)

router.use('/dashboard', require('./dashboard'));

router.get('/sign-out', employeeController.destroySession)

router.get('/students-page', studentController.studentsPage)
router.post('/students-page/create-student', studentController.createStudent)
router.get('/students-page/:studentId',studentController.showDetail);
router.get('/students-page/delete-student/:studentId', studentController.deleteStudent);

router.get('/companies-page', companyController.companyPage);
router.post('/companies-page/create-company', companyController.createCompany)
router.get('/companies-page/:companyId',companyController.showDetail);
// router.post('/companies-page/createInterview', companyController.createInterview)

router.get('/interviews-page', interviewController.interviewPage)
router.post('/interviews-page/createInterview', interviewController.createInterview)
router.get('/interviews-page/:interviewId', interviewController.showUpdateDetail)
router.post('/interviews-page/update-interview/:interviewId',interviewController.updateInterview)
router.get('/interviews-page/delete-interview/:interviewId', interviewController.deleteInterview)






router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/authorization'}), employeeController.createSession)

module.exports = router;