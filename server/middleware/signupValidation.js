const validateUserSignUp = (req, res, next) => {
	const {
		password,
		name,
		email,
	} = req.body;
	if (
		!password ||
    !name ||
    !email
	) {
		return res.status(400)
			.json({
				message: 'All or some of the field is/are undefined',
			});
	}
	if (!req.body.email) {
		return res.status(400).send({
			message: 'Email is required',
		});
	}
	if (!req.body.password) {
		return res.status(400).send({
			message: 'Password is required',
		});
	}
	if (!req.body.name) {
		return res.status(400).send({
			message: 'Name is required',
		});
	}
	if (!req.body.name.match('[a-zA-Z]+$')) {
		return res.status(400).send({
			message: 'Only alphabets allowed in name',
		});
	}
	next();
};

module.exports = validateUserSignUp;
