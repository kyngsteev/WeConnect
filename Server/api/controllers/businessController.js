const express = require('express');
const dummyModels = require('../models/dummyData');
const createBusiness = require('../models/businessModel');


let api = express.Router();

// '/v1/businesses' - Register business
api.post('/', (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({
			message: 'Bad Request: name missing',
			error: true
		});
	} else if (!req.body.address) {
		return res.status(400).json({
			message: 'Bad Request: address missing',
			error: true
		});
	}
	const newBiz = createBusiness(req.body.name, req.body.address);
	return res.status(201).json(newBiz);
});

// '/v1/businesses' - Read
api.get('/', (req, res) => {
	if (req.query.location) {
		const bizLocation = dummyModels.filter(model => model.location === req.query.location);
		if (typeof bizLocation === 'undefined' || bizLocation.length === 0) {
			res.status(404).json({
				message: 'Not found',
				error: true
			});
		} else {
			res.json({ bizLocation });
		}
	} else if (req.query.category) {
		const bizCategory = dummyModels.filter(model => model.category === req.query.category);
		if (typeof bizCategory === 'undefined' || bizCategory.length === 0) {
			res.status(404).json({
				message: 'Not found',
				error: true
			});
		} else {
			res.json({ bizCategory });
		}
	} else {
		res.json({ dummyModels,	error: false });
	}
});

// '/v1/businesses/:businessId' - Get 1 record
api.get('/:businessId', (req, res) => {
	for (let dummyData of dummyModels) {
		if (dummyData.id === parseInt(req.params.businessId, 10)) {
			return res.json({
				dummyData,
				message: 'success',
				error: false
			});
		}
	}
	return res.status(404).json({
		message: 'User not found',
		error: true
	});
});

// '/v1/businesses/:businessId' - Update
api.put('/:businessId', (req, res) => {
	for (let dummyData of dummyModels) {
		if (dummyData.id === parseInt(req.params.businessId, 10)) {
			dummyData.bizName = req.body.name;
			return res.json({
				message: 'success',
				error: false
			});
		}
	}
	return res.status(404).json({
		message: 'User not found',
		error: true
	});
});

// '/v1/businesses/:businessId' - Delete
api.delete('/:businessId', (req, res) => {
	for (let i = 0; i < dummyModels.length; i += 1) {
		if (dummyModels[i].id === parseInt(req.params.businessId, 10)) {
			dummyModels.splice(i, 1);
			return res.json({
				message: 'success',
				error: false
			});
		}
	}
	return res.status(404).json({
		message: 'User not found',
		error: true
	});
});

// '/v1/businesses/:businessId/reviews' - Get reviews
api.get('/:businessId/reviews', (req, res) => {
	for (let dummyData of dummyModels) {
		if (dummyData.id === parseInt(req.params.businessId, 10)) {
			const { review } = dummyData;
			return res.json({
				review,
				message: 'success',
				error: false
			});
		}
	}
	return res.status(404).json({
		message: 'User not found',
		error: true
	});
});

// '/v1/businesses/:businessId/reviews' - Post review
api.post('/:businessId/reviews', (req, res) => {
	for (let dummyData of dummyModels) {
		if (dummyData.id === parseInt(req.params.businessId, 10)) {
			const { review } = dummyData;
			const { title, description } = req.body;
			const newId = review[(review.length) - 1].id + 1;
			const newReview = {
				id: newId,
				title,
				description
			};
			if (!title) {
				return res.status(400).json({
					message: 'Bad Request: title missing',
					error: true
				});
			} else if (!description) {
				return res.status(400).json({
					message: 'Bad Request: description missing',
					error: true
				});
			}
			review.push(newReview);
			return res.status(201).json(review[(review.length) - 1]);
		}
	}
	return res.status(404).json({
		message: 'User not found',
		error: true
	});
});

// '/v1/businesses?location=<location>' - Read
api.get('/', (req, res) => {
	const bizLocation = dummyModels.filter(dummyModel => dummyModel.location === req.query.location);
	console.log(req.query.location);
	res.json({
		bizLocation,
		error: false
	});
});

module.exports = api;
