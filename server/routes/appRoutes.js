const businessController = require('../controllers').dbBusiness;

module.exports = (app) => {
	app.get('/v1', (req, res) => res.status(200).send({
		message: 'Welcome to the Todos API!',
	}));

	app.post('/v1/businesses', businessController.create);
	app.get('/v1/businesses', businessController.list);
	app.get('/v1/businesses', businessController.listByCategory);
	app.get('/v1/businesses', businessController.listByLocation);
	app.get('/v1/businesses/:businessId', businessController.listOne);
	app.put('/v1/businesses/:businessId', businessController.update);
	app.delete('/v1/businesses/:businessId', businessController.destroy);
};
