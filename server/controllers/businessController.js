const express = require('express');
const businessDataModels = require('../data/businessData');
const createBusiness = require('../models/businessModel');

let api = express.Router();

let checkReview = (review) => {
	if (review && review.length) {
		return review;
	}
	return [];
};

// '/v1/businesses' - Register business
api.post('/', (req, res) => {
	let newBusiness, business;

	if (!req.body.name || typeof req.body.name !== 'string') {
		return res.status(400).json({
			message: 'Bad Request: name missing',
			error: true
		});
	} else if (!req.body.address || typeof req.body.address !== 'string') {
		return res.status(400).json({
			message: 'Bad Request: address missing',
			error: true
		});
	}

	let getReview = checkReview(req.body.review);
	newBusiness = createBusiness(
		req.body.name, req.body.address,
		req.body.location, req.body.category, getReview
	);

	let businessObject = businessDataModels.filter(m => m.name === newBusiness.name);
	if (businessObject.length !== 0) {
		return res.status(400).json({
			message: 'Business already exist',
		});
	}
	businessDataModels.push(newBusiness);
	business = businessDataModels[(businessDataModels.length) - 1];
	return res.status(201).json(business);
});

// '/v1/businesses' - Read
api.get('/', (req, res) => {
	const reqBody = req.query;
	if (reqBody.location) {
		const businessLocation = businessDataModels
			.filter(m => m.location.toLowerCase() === reqBody.location.toLowerCase());
		if (typeof businessLocation === 'undefined' || businessLocation.length === 0) {
			res.status(404).json({
				message: 'Business not found',
				error: true
			});
		} else {
			res.json({ businessLocation });
		}
	} else if (reqBody.category) {
		const businessCategory = businessDataModels
			.filter(m => m.category.toLowerCase() === reqBody.category.toLowerCase());
		if (typeof businessCategory === 'undefined' || businessCategory.length === 0) {
			res.status(404).json({
				message: 'Business not found',
				error: true
			});
		} else {
			res.json({ businessCategory });
		}
	} else {
		res.json({ businessDataModels,	error: false });
	}
});

// '/v1/businesses/:businessId' - Get 1 record
api.get('/:businessId', (req, res) => {
	for (let businessDataModel of businessDataModels) {
		if (businessDataModel.id === parseInt(req.params.businessId, 10)) {
			return res.json({
				businessDataModel,
				message: 'success',
				error: false
			});
		}
	}
	return res.status(404).json({
		businessDataModel,
		message: 'Business not found',
		error: true
	});
});

// '/v1/businesses/:businessId' - Update
api.put('/:businessId', (req, res) => {
	let request = req.body;
	for (let businessDataModel of businessDataModels) {
		if (businessDataModel.id === parseInt(req.params.businessId, 10)) {
			businessDataModel.name = request.name;
			businessDataModel.address = request.address;
			businessDataModel.location = request.location;
			businessDataModel.category = request.category;
			businessDataModel.review = request.review;
			return res.json({
				businessDataModel,
				message: 'Business updated',
				error: false
			});
		}
	}
	return res.status(404).json({
		message: 'Business not found',
		error: true
	});
});

// '/v1/businesses/:businessId' - Delete
api.delete('/:businessId', (req, res) => {
	for (let i = 0; i < businessDataModels.length; i += 1) {
		if (businessDataModels[i].id === parseInt(req.params.businessId, 10)) {
			businessDataModels.splice(i, 1);
			return res.json({
				message: 'Business record successfully deleted',
				error: false
			});
		}
	}
	return res.status(404).json({
		message: 'Business not found',
		error: true
	});
});

// '/v1/businesses/:businessId/reviews' - Get reviews
api.get('/:businessId/reviews', (req, res) => {
	for (let dummyData of businessDataModels) {
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
		message: 'Review not found',
		error: true
	});
});

// '/v1/businesses/:businessId/reviews' - Post review
api.post('/:businessId/reviews', (req, res) => {
	let newId;

	for (let dummyData of businessDataModels) {
		if (dummyData.id === parseInt(req.params.businessId, 10)) {
			let { review } = dummyData;
			let { title, description } = req.body;

			if (review.length === 0) {
				newId = 1;
			} else {
				newId = review[(review.length) - 1].id + 1;
			}

			let newReview = {
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
		message: 'Review not found',
		error: true
	});
});

// '/v1/businesses?location=<location>' - Read
api.get('/', (req, res) => {
	const businessLocation = businessDataModels
		.filter(dummyModel => dummyModel.location === req.query.location);
	console.log(req.query.location);
	res.json({
		businessLocation,
		error: false
	});
});

module.exports = api;
