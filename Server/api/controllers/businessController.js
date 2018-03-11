const express = require('express');
const dummyModels = require('../models/dummyData');
const createBusiness = require('../models/businessModel');


let api = express.Router();

// '/v1/businesses' - Create
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
api.get('/', (req, res) => res.json({
	dummyModels,
	error: false
}));

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

module.exports = api;
