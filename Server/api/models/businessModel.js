const bizModels = require('./dummyData');

const createBusiness = (name, address) => {
	const newId = bizModels[(bizModels.length) - 1].id + 1;
	const newUser = {
		id: newId,
		bizName: name,
		bizAddress: address
	};
	// save the business
	bizModels.push(newUser);
	return bizModels[(bizModels.length) - 1];
};

module.exports = createBusiness;
