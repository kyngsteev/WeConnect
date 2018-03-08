const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// app.use(require('./controllers'));

app.listen('3000', () => {
	console.log('App running on port 3000');
});
