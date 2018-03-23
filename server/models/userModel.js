const userData = require('../data/userData');

const userModel = (name, email, password) => {
	const id = userData[(userData.length) - 1].id + 1;
	const newUser = {
		id,
		name,
		email,
		password
	};
	// return business object
	return newUser;
};

module.exports = userModel;
