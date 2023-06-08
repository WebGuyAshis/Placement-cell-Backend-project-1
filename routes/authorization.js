const express = require('express');
const router = express.Router();
const authorizationController = require('../controllers/authorizationController');


router.get('/', authorizationController.home);
// router.post('/createEmployee', authorizationController.createEmployee);

module.exports = router;