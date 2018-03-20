const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();

let swaggerDefinition = {
	info: {
		title: 'Node Swagger API',
		version: '1.0.0',
		description: 'Demonstrating how to describe a RESTful API with Swagger',
	},
	host: 'localhost:3000',
	basePath: '/',
};

// options for the swagger docs
let options = {
	// import swaggerDefinitions
	swaggerDefinition,
	// path to the API docs
	apis: ['./api/routes/*.js'],
};

// initialize swagger-jsdoc
let swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

app.use(bodyParser.json());

app.use(require('./api/routes/businessRoutes'));

app.listen('3000', () => {
	console.log('App running on port 3000');
});

module.exports = app;
