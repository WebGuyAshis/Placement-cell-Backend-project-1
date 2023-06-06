const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')

router.get('/', homeController.home)
router.use('/authorization', require('./authorization'))

module.exports = router;