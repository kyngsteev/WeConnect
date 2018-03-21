const express = require('express');
const dummyModels = require('../models/dummyData');
const createBusiness = require('../models/businessModel');


let api = express.Router();

/**
 * @swagger
 * definitions:
 *   Business:
 *     properties:
 *       name:
 *         type: string
 *       address:
 *         type: string
 *       location:
 *         type: string
 *       category:
 *         type: string
 * 			 review:
 * 				 parameters:
 *       - name: review
 *         description: Reviews object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Reviews'
 */

/**
 * @swagger
 * definitions:
 *   Reviews:
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 */

/**
 * @swagger
 * /v1/businesses:
 *   post:
 *     tags:
 *       - businesses
 *     description: Creates a new business
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: business
 *         description: Business object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Business'
 *     responses:
 *       201:
 *         description: Successfully created
 */
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

/**
 * @swagger
 * /v1/businesses:
 *   get:
 *     tags:
 *       - Businesses
 *     description: Returns all businesses
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of businesses
 *         schema:
 *           $ref: '#/definitions/Business'
 */
api.get('/', (req, res) => {
	const reqBody = req.query;
	if (reqBody.location) {
		const bizLocation = dummyModels.filter(model => model.location === reqBody.location);
		if (typeof bizLocation === 'undefined' || bizLocation.length === 0) {
			res.status(404).json({
				message: 'Not found',
				error: true
			});
		} else {
			res.json({ bizLocation });
		}
	} else if (reqBody.category) {
		const bizCategory = dummyModels.filter(model => model.category === reqBody.category);
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

/**
 * @swagger
 * /v1/businesses/{id}:
 *   get:
 *     tags:
 *       - Businesses
 *     description: Returns a single Business
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Business id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single business
 *         schema:
 *           $ref: '#/definitions/Business'
 */
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

/**
 * @swagger
 * /v1/businesses/{id}:
 *   put:
 *     tags: Businesses
 *     description: Updates a single business
 *     produces: application/json
 *     parameters:
 *       name: business
 *       in: body
 *       description: Fields for the Business resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/Business'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
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

/**
 * @swagger
 * /v1/businesses/{id}:
 *   delete:
 *     tags:
 *       - Businesses
 *     description: Deletes a single business
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Business id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
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

module.exports = api;
