const express = require('express');

const router = express.Router();

router.use('/v1/businesses', require('../controllers/businessController'));
router.use('/v1/auth', require('../controllers/userController'));
// router.use('/', require('../controllers/documentationController'));

module.exports = router;
