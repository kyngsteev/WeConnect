'use strict';

var app = require('../app');
var request = require('supertest');
var chai = require('chai');

var expect = chai.expect.expect;


var business = {
	bizName: 'ABZ Limited',
	bizAddress: '4 XYZ street, Abuja',
	location: 'Abuja',
	category: 'Transprotation',
	review: [{
		id: 1,
		title: 'Good Service',
		description: 'Lorem ipsum dolor sit amet.'
	}]
};

describe('Get all businesses', function () {
	it('Get\'s all businesses', function () {
		request(app).get('/').expect(200);
	});
});

describe('Get one business record', function () {
	it('Get\'s a business record', function () {
		request(app).get('/:businessId').expect(200).expect([]);
	});
});

describe('Register a business', function () {
	it('Post a business detail to server', function () {
		request(app).post('/').send(business).expect([], 201);
	});
});
//# sourceMappingURL=test.js.map