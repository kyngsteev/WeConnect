const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(require('./routes'));

app.listen('3000', () => {
	console.log('App running on port 3000');
});
