const express = require('express');
const router = express.Router();
const authorizationController = require('../controllers/authorizationController')
router.get('/', authorizationController.home)

module.exports = router;