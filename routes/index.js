const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')
// const dashboardController = require('../controllers/dashboardController')

router.get('/', homeController.home)
// router.get('/dashboard',dashboardController.home )
router.use('/employee', require('./employee'))
router.use('/new', require('./employee'))
router.use('/authorization', require('./authorization'))

module.exports = router;