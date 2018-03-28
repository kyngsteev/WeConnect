const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/appRoutes')(app);

app.use(express.static(`${__dirname}/public`));

// serve api docs
app.get('/', (req, res) => {
	res.sendFile('index.htm');
});

// catch all other routes
app.get('*', (req, res) => {
	res.status(200).send({
		message: 'Welcome to the world on nothingness'
	});
});

app.set('port', parseInt(process.env.PORT, 10) || 3000);

http.createServer(app).listen(app.get('port'), () => {
	console.log(`Express server listening on port ${app.get('port')}`);
});

module.exports = app;
