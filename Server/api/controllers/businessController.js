const express = require('express');
const dummyModels = require('../models/dummyData');
const createBusiness = require('../models/businessModel');


let api = express.Router();

// '/v1/businesses' - Create
api.post('/', (req, res) => {
	if (!req.body.name) {
		return res.status(404).json({
			message: 'Bad Request: name missing',
			error: true
		});
	} else if (!req.body.address) {
		return res.status(404).json({
			message: 'Bad Request: address missing',
			error: true
		});
	}
	const newBiz = createBusiness(req.body.name, req.body.address);
	return res.status(201).json(newBiz);
});

// '/v1/restaurant/' - Read
api.get('/', (req, res) => res.json({
	restaurants,
	error: false
}));

// // '/v1/restaurant/:restaurantid' - Get 1 record
// api.get('/:restaurantid', (req, res) => {
// 	for (let restaurant of restaurants) {
// 		if (restaurant.id === parseInt(req.params.restaurantid, 10)) {
// 			return res.json({
// 				restaurant,
// 				message: 'success',
// 				error: false
// 			});
// 		}
// 	}
// 	return res.status(404).json({
// 		message: 'User not found',
// 		error: true
// 	});
// });

// // '/v1/restaurant/:restaurantid' - Update
// api.put('/:restaurantid', (req, res) => {
// 	for (let restaurant of restaurants) {
// 		if (restaurant.id === parseInt(req.params.restaurantid, 10)) {
// 			restaurant.name = req.body.name;
// 			return res.json({
// 				message: 'success',
// 				error: false
// 			});
// 		}
// 	}
// 	return res.status(404).json({
// 		message: 'User not found',
// 		error: true
// 	});
// });

// // '/v1/restaurant/:restaurantid' - Delete
// api.delete('/:restaurantid', (req, res) => {
// 	for (let i = 0; i < restaurants.length; i++) {
// 		if (restaurants[i].id === parseInt(req.params.restaurantid, 10)) {
// 			restaurants.splice(i, 1);
// 			return res.json({
// 				message: 'success',
// 				error: false
// 			});
// 		}
// 	}
// 	return res.status(404).json({
// 		message: 'User not found',
// 		error: true
// 	});
// });

module.exports = api;
