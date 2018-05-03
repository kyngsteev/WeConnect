const staticBusiness = require('./businessController');
const staticUser = require('./userController');
const dbBusiness = require('./businesses');
const dbUser = require('./users');

module.exports = {
	staticBusiness,
	staticUser,
	dbBusiness,
	dbUser
};
