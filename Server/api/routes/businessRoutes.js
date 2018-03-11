const express = require('express');

const router = express.Router();

router.use('/v1/businesses', require('../controllers/businessController'));

module.exports = router;
