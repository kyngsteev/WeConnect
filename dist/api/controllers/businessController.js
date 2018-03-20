'use strict';

var express = require('express');
var dummyModels = require('../models/dummyData');
var createBusiness = require('../models/businessModel');

var api = express.Router();

// '/v1/businesses' - Register business
api.post('/', function (req, res) {
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
	var newBiz = createBusiness(req.body.name, req.body.address);
	return res.status(201).json(newBiz);
});

// '/v1/businesses' - Read
api.get('/', function (req, res) {
	var reqBody = req.query;
	if (reqBody.location) {
		var bizLocation = dummyModels.filter(function (model) {
			return model.location === reqBody.location;
		});
		if (typeof bizLocation === 'undefined' || bizLocation.length === 0) {
			res.status(404).json({
				message: 'Not found',
				error: true
			});
		} else {
			res.json({ bizLocation: bizLocation });
		}
	} else if (reqBody.category) {
		var bizCategory = dummyModels.filter(function (model) {
			return model.category === reqBody.category;
		});
		if (typeof bizCategory === 'undefined' || bizCategory.length === 0) {
			res.status(404).json({
				message: 'Not found',
				error: true
			});
		} else {
			res.json({ bizCategory: bizCategory });
		}
	} else {
		res.json({ dummyModels: dummyModels, error: false });
	}
});

// '/v1/businesses/:businessId' - Get 1 record
api.get('/:businessId', function (req, res) {
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = dummyModels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var dummyData = _step.value;

			if (dummyData.id === parseInt(req.params.businessId, 10)) {
				return res.json({
					dummyData: dummyData,
					message: 'success',
					error: false
				});
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return res.status(404).json({
		message: 'User not found',
		error: true
	});
});

// '/v1/businesses/:businessId' - Update
api.put('/:businessId', function (req, res) {
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = dummyModels[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var dummyData = _step2.value;

			if (dummyData.id === parseInt(req.params.businessId, 10)) {
				dummyData.bizName = req.body.name;
				return res.json({
					message: 'success',
					error: false
				});
			}
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	return res.status(404).json({
		message: 'User not found',
		error: true
	});
});

// '/v1/businesses/:businessId' - Delete
api.delete('/:businessId', function (req, res) {
	for (var i = 0; i < dummyModels.length; i += 1) {
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
api.get('/:businessId/reviews', function (req, res) {
	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = dummyModels[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var dummyData = _step3.value;

			if (dummyData.id === parseInt(req.params.businessId, 10)) {
				var review = dummyData.review;

				return res.json({
					review: review,
					message: 'success',
					error: false
				});
			}
		}
	} catch (err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if (_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}

	return res.status(404).json({
		message: 'User not found',
		error: true
	});
});

// '/v1/businesses/:businessId/reviews' - Post review
api.post('/:businessId/reviews', function (req, res) {
	var _iteratorNormalCompletion4 = true;
	var _didIteratorError4 = false;
	var _iteratorError4 = undefined;

	try {
		for (var _iterator4 = dummyModels[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
			var dummyData = _step4.value;

			if (dummyData.id === parseInt(req.params.businessId, 10)) {
				var review = dummyData.review;
				var _req$body = req.body,
				    title = _req$body.title,
				    description = _req$body.description;

				var newId = review[review.length - 1].id + 1;
				var newReview = {
					id: newId,
					title: title,
					description: description
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
				return res.status(201).json(review[review.length - 1]);
			}
		}
	} catch (err) {
		_didIteratorError4 = true;
		_iteratorError4 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion4 && _iterator4.return) {
				_iterator4.return();
			}
		} finally {
			if (_didIteratorError4) {
				throw _iteratorError4;
			}
		}
	}

	return res.status(404).json({
		message: 'User not found',
		error: true
	});
});

// '/v1/businesses?location=<location>' - Read
api.get('/', function (req, res) {
	var bizLocation = dummyModels.filter(function (dummyModel) {
		return dummyModel.location === req.query.location;
	});
	console.log(req.query.location);
	res.json({
		bizLocation: bizLocation,
		error: false
	});
});

module.exports = api;
//# sourceMappingURL=businessController.js.map