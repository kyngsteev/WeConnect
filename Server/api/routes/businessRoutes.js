// api/models/businessRoutes.js
const myBusiness = require('../controllers/businessController');

module.exports = (app) => {
	// our Routes
	app.route('/businesses')
		.get(myBusiness.getBusinesses)
		.post(myBusiness.createBusinesses);

	app.route('/businesses/:businessId')
		.get(myBusiness.readBusinesses)
		.put(myBusiness.updateBusinesses)
		.delete(myBusiness.deleteBusinesses);

	app.route('/businesses/:businessId/reviews')
		.get(myBusiness.getReviews)
		.post(myBusiness.postReviews);
};
