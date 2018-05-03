const models = require('../models');

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
					res.status(201).send({
						message: 'Business successfully created',
						Business: user
					});
				} else {
					res.status(404).send({
						message: 'Sorry! Business already exist',
						error: created
					});
				}
			});
	},

	// Get all Businesses
	list(req, res) {
		return models.Business
			.all()
			.then(business => res.status(200).send({
				message: 'Success',
				Businesses: business
			}))
			.catch(error => res.status(400).send({
				message: 'No business found',
				error
			}));
	},

	// Get one Business
	listOne(req, res) {
		return models.Business
			.findById(req.params.businessId)
			.then((business) => {
				if (!business) {
					return res.status(409).send({
						message: 'No business found',
						business: []
					});
				}
				return res.status(200).send({
					message: 'Success',
					Businesses: business
				});
			})
			.catch(error => res.status(400).send({
				message: 'No business found',
				error
			}));
	},

	// List all Businesses by location
	listByLocation(req, res) {
		return models.Business
			.findAll(req.params.location)
			.then(business => res.status(200).send({
				message: 'Success',
				Businesses: business
			}))
			.catch(error => res.status(400).send({
				message: 'No business found',
				error
			}));
	},

	// List all Businesses by category
	listByCategory(req, res) {
		return models.Business
			.findAll(req.params.category)
			.then(business => res.status(200).send({
				message: 'Success',
				Businesses: business
			}))
			.catch(error => res.status(400).send({
				message: 'No business found',
				error
			}));
	},

	update(req, res) {
		return models.Business
			.findById(req.params.businessId)
			.then((business) => {
				if (!business) {
					return res.status(404).send({
						message: 'No business found',
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
					.then(() => res.status(200).send({
						message: 'Business successfully updated',
						Business: business
					})) // Send back the updated business.
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
						message: 'No business found',
					});
				}
				return business
					.destroy()
					.then(() => res.status(200).send({
						message: 'Business has been successfully deleted',
					}))
					.catch(error => res.status(400).send({
						message: 'Business could not be deleted',
						error
					}));
			})
			.catch(error => res.status(400).send(error));
	}
};
