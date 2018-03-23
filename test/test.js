const app = require('../app');
const request = require('supertest');
const chai = require('chai');

const { expect } = chai.expect;

let business = {
	name: 'ABZ Limited',
	address: '4 XYZ street, Abuja',
	location: 'Abuja',
	category: 'Transprotation',
	review: [
		{
			title: 'Good Service',
			description: 'Lorem ipsum dolor sit amet.'
		}
	]
};

describe('Users Test', () => {
	describe('POST /auth/signup', () => {
		it('should register a user on sign up', () => {
			const newUser = {
				name: 'jubril omotunde',
				email: 'jaybee@gmail.com',
				password: 'lmn'
			};
			request(app)
				.post('/v1/auth/signup')
				.send(newUser)
				.expect((res) => {
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					res.statusCode.should.equal(200);
				});
		});
		it('should return bad request if no password', () => {
			const newUser = {
				name: 'jubril omotunde',
				email: 'jaybee@gmail.com'
			};
			request(app)
				.post('/v1/auth/signup')
				.send(newUser)
				.expect((res) => {
					res.body.should.be.a('object');
					res.body.should.have.property('error');
					res.statusCode.should.equal(400);
				});
		});
	});

	describe(' POST /auth/login', () => {
		it('should login a registered user', () => {
			const details = {
				email: 'james@email.com',
				password: 'xtgsl'
			};
			request(app)
				.post('v1/auth/login')
				.send(details)
				.expect((res) => {
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					res.body.should.not.equal(0);
					res.statusCode.should.equal(200);
				});
		});
	});
});

describe('Business Test', () => {
	describe('GET v1/businesses', () => {
		it('should get\'s all businesses', () => {
			request(app).get('/')
				.expect((res) => {
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					res.body.should.not.equal(0);
					res.statusCode.should.equal(200);
				});
		});
	});

	describe('GET v1/businesses/:businessId', () => {
		it('Get\'s a business record', () => {
			request(app).get('/:businessId')
				.expect((res) => {
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					res.body.should.not.equal(0);
					res.statusCode.should.equal(200);
				});
		});
	});

	describe('POST v1/businesses', () => {
		it('Post should register a new business', () => {
			request(app).post('/')
				.send(business)
				.expect((res) => {
					res.body.should.be.a('object');
					res.body.should.not.equal(0);
					res.statusCode.should.equal(201);
				});
		});
	});

	describe('PUT /businesses/:businessId', () => {
		it('should update a business', () => {
			const update = {
				name: 'Osa farms',
				address: '23 Oluku junction. Benin byepass',
				location: 'Benin City',
				category: 'Agriculture'
			};
			request(app)
				.put('/v1/businesses/3')
				.send(update)
				.expect((res) => {
					res.statusCode.should.equal(200);
					res.body.should.not.equal(0);
					res.body.should.be.a('object');
					res.body.should.have.property('message');
					res.body.message.should.equal('Business updated');
				});
		});
		it('should return invalid id', () => {
			const update = {
				name: 'Osa farms',
				address: '23 Oluku junction. Benin byepass',
				location: 'Benin City',
				category: 'Agriculture'
			};
			request(app)
				.put('v1/businesses/106')
				.send(update)
				.expect((res) => {
					res.body.should.be.a('object');
					res.body.should.have.property('error');
					res.body.error.should.not.equal(null);
					res.body.error.should.equal('Business not found');
					res.statusCode.should.equal(404);
				});
		});
		it('should return bad request', () => {
			request(app)
				.put('v1/businesses/106')
				.send()
				.expect((res) => {
					res.body.should.be.a('object');
					res.body.should.have.property('error');
					res.body.error.should.equal('Bad request');
					res.statusCode.should.equal(400);
				});
		});
	});

	describe('DELETE v1/businesses/:businessId', () => {
		before(() => {
			request(app)
				.post('/api/v1/businesses')
				.send(business);
		});
		it('should remove a business', () => {
			request(app)
				.delete('/v1/businesses/4')
				.expect((res) => {
					res.statusCode.should.equal(200);
					res.body.should.have.property('message');
					res.body.message.should.equal('Business record successfully deleted');
				});
		});
		it('shold return an error if business id is invalid', () => {
			request(app)
				.delete('v1/businesses/106')
				.expect((res) => {
					res.body.should.be.a('object');
					res.body.should.have.property('error');
					res.statusCode.should.equal(404);
				});
		});
	});
});
