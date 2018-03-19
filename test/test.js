const app = require('../app');
const request = require('supertest');
const chai = require('chai');

const { expect } = chai.expect;

let business = {
	bizName: 'ABZ Limited',
	bizAddress: '4 XYZ street, Abuja',
	location: 'Abuja',
	category: 'Transprotation',
	review: [
		{
			id: 1,
			title: 'Good Service',
			description: 'Lorem ipsum dolor sit amet.'
		}
	]
};

describe('Get all businesses', () => {
	it('Get\'s all businesses', () => {
		request(app).get('/')
			.expect(200);
	});
});

describe('Get one business record', () => {
	it('Get\'s a business record', () => {
		request(app).get('/:businessId')
			.expect(200)
			.expect([]);
	});
});

describe('Register a business', () => {
	it('Post a business detail to server', () => {
		request(app).post('/')
			.send(business)
			.expect([], 201);
	});
});

