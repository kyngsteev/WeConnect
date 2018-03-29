const userData = require('../data/userData');

const userModel = (firstName, surName, email, password) => {
	const id = userData[(userData.length) - 1].id + 1;
	const newUser = {
		id,
		firstName,
		surName,
		email,
		password
	};
	// return business object
	return newUser;
};

module.exports = userModel;
