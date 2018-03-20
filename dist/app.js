'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use(require('./api/routes/businessRoutes'));

app.listen('3000', function () {
	console.log('App running on port 3000');
});

module.exports = app;
//# sourceMappingURL=app.js.map