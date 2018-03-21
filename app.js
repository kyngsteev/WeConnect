const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(require('./api/routes/businessRoutes'));

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), () => {
	console.log(`Express server listening on port ${app.get('port')}`);
});

module.exports = app;
