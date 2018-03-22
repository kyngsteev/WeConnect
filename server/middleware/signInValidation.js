const validateUserSignIn = (req, res, next) => {
	if (!req.body.password && !req.body.email) {
		return res.status(400)
			.json({
				message: 'All or some of the field is/are undefined',
			});
	}
	if (!req.body.email) {
		return res.status(400).send({
			message: 'email is can not be empty',
		});
	}
	if (!req.body.password) {
		return res.status(400).send({
			message: 'please enter a password ',
		});
	}
	next();
};

module.exports = validateUserSignIn;
