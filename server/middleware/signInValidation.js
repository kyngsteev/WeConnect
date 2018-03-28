const regex = /^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g'/;

const validateUserSignIn = (req, res, next) => {
	const { email, password } = req.body;
	if (!password && !email) {
		return res.status(400)
			.json({
				message: 'All or some of the field is/are missing',
			});
	}
	if (!email || !password) {
		return res.status(400).send({
			message: 'Email or password cannot be empty',
		});
	}
	next();
};

module.exports = validateUserSignIn;
