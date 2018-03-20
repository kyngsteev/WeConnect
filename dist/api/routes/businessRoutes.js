'use strict';

var express = require('express');

var router = express.Router();

router.use('/v1/businesses', require('../controllers/businessController'));

module.exports = router;
//# sourceMappingURL=businessRoutes.js.map