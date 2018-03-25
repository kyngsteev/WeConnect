const express = require('express');
const userDataModels = require('../data/userData');
const usersModel = require('../dummy-models/userModel');
const validateSignUp = require('../middleware/signupValidation');
const validateSignIn = require('../middleware/signInValidation');

let api = express.Router();

// 'v1/auth/signup' - Register a new User
api.post('/signup', validateSignUp, (req, res) => {
	let createUser, newUser, getUser;
	getUser = userDataModels.filter(m => m.email === req.body.email);
	if (typeof getUser !== 'undefined' && getUser.length !== 0) {
		res.status(404).json({
			message: 'User Already Exists',
			error: true
		});
	}
	createUser = usersModel(req.body.name, req.body.email, req.body.password);
	userDataModels.push(createUser);
	newUser = userDataModels[(userDataModels.length - 1)];
	return res.status(201).json(newUser);
});

// 'v1/auth/login' - User Sign In
api.post('/login', validateSignIn, (req, res) => {
	let getUser = userDataModels.filter(m => m.email === req.body.email);
	if (typeof getUser !== 'undefined' || getUser.length !== 0) {
		if (getUser[0].password === req.body.password) {
			return res.status(200).json({
				message: 'User successfully signed in',
				error: false
			});
		}
		return res.status(400).json({
			message: 'Bad Request: invalid password',
			error: true
		});
	}
	return res.status(404).send({
		message: 'User profile not found, please signup',
	});
});

module.exports = api;
