const regex = new RegExp('^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g');

const validateUserSignUp = (req, res, next) => {
	const {
		password,	firstName, surName,	email
	} = req.body;
	if (!password || !firstName || !surName || !email) {
		return res.status(400)
			.json({
				message: 'All or some of the field is/are missing',
			});
	}
	if (!regex.test(req.body.password)) {
		return res.status(400).send({
			message: 'Password must contain at least 6 letters and 1 digit',
		});
	}
	if (!firstName.match('[a-zA-Z]+$') && !surName.match('[a-zA-Z]+$')) {
		return res.status(400).send({
			message: 'Only alphabets allowed in name',
		});
	}
	next();
};

module.exports = validateUserSignUp;
