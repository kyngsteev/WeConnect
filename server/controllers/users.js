const models = require('../models');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
	// Create User
	create(req, res) {
		const { name, email, password } = req.body;

		const salt = bcrypt.genSaltSync(saltRounds);
		const hashPassword = bcrypt.hashSync(password, salt);

		return models.User
			.findOrCreate({
				where: { name, email, password: hashPassword }
			})
			.spread((user, created) => {
				if (created === true) {
					res.status(201).send({
						message: 'User successfully created',
						Business: user
					});
				} else {
					res.status(404).send({
						message: 'Sorry! User already exist',
						error: created
					});
				}
			});
	}

};
