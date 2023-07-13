const express = require('express');
const router = express.Router();
const passport = require('passport')
const homeController = require('../controllers/homeController');
const downloadController = require('../controllers/downloadController');
// const dashboardController = require('../controllers/dashboardController')

router.get('/', homeController.home)
// router.get('/dashboard',dashboardController.home )
router.use('/employee', passport.checkAuthentication, require('./employee'));

router.use('/new', require('./employee'));

router.use('/authorization', require('./authorization'))

router.get('/download-students-csv', passport.checkAuthentication, downloadController.downloadStudentsCSV)

module.exports = router;