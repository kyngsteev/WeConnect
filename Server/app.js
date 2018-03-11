const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// app.use((req, res) => {
// 	res.status(404).send({ url: `${req.originalUrl} not found` });
// });

app.use(require('./api/controllers/businessController'));

app.listen('3000', () => {
	console.log('App running on port 3000');
});
