const businessData = require('../data/businessData');

const createBusiness = (name, address, location, category, review) => {
	const id = businessData[(businessData.length) - 1].id + 1;
	const newBusiness = {
		id,
		name,
		address,
		location,
		category,
		review
	};
	// return business object
	return newBusiness;
};

module.exports = createBusiness;
