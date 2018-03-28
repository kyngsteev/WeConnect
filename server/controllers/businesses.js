const models = require('../models');
const Review = require('../models/review');
const User = require('../models/user');

module.exports = {

	// Create a Business
	create(req, res) {
		const {
			name, address, description, location, category
		} = req.body;

		return models.Business
			.findOrCreate({
				where: { name },
				defaults: {
					address, description, location, category
				}
			})
			.spread((user, created) => {
				if (created === true) {
					res.status(201).send(user);
				} else {
					res.status(404).send({
						message: 'Sorry! User already exist',
						error: created
					});
				}
			});
	},

	// Get all Businesses
	list(req, res) {
		return models.Business
			.all()
			.then(business => res.status(200).send(business))
			.catch(error => res.status(400).send(error));
	},

	// Get one Business
	listOne(req, res) {
		return models.Business
			.findById(req.params.businessId)
			.then((business) => {
				if (!business) {
					return res.status(404).send({
						message: 'Business Not Found',
					});
				}
				return res.status(200).send(business);
			})
			.catch(error => res.status(400).send(error));
	},

	// List all Businesses by location
	listByLocation(req, res) {
		return models.Business
			.findAll(req.params.location)
			.then(business => res.status(200).send(business))
			.catch(error => res.status(400).send(error));
	},

	// List all Businesses by category
	listByCategory(req, res) {
		return models.Business
			.findAll(req.params.category)
			.then(business => res.status(200).send(business))
			.catch(error => res.status(400).send(error));
	},

	update(req, res) {
		return models.Business
			.findById(req.params.businessId)
			.then((business) => {
				if (!business) {
					return res.status(404).send({
						message: 'Business Not Found',
					});
				}
				return business
					.update({
						name: req.body.name || business.name,
						address: req.body.address || business.address,
						description: req.body.description || business.description,
						location: req.body.location || business.location,
						category: req.body.category || business.category
					})
					.then(() => res.status(200).send(business)) // Send back the updated business.
					.catch(error => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
	},

	destroy(req, res) {
		return models.Business
			.findById(req.params.businessId)
			.then((business) => {
				if (!business) {
					return res.status(404).send({
						message: 'Business Not Found',
					});
				}
				return business
					.destroy()
					.then(() => res.status(200).send({
						message: 'Business has been successfully deleted',
					}))
					.catch(error => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
	}
};
