'use strict';

var bizModels = require('./dummyData');

var createBusiness = function createBusiness(name, address) {
	var newId = bizModels[bizModels.length - 1].id + 1;
	var newUser = {
		id: newId,
		bizName: name,
		bizAddress: address
	};
	// save the business
	bizModels.push(newUser);
	return bizModels[bizModels.length - 1];
};

module.exports = createBusiness;
//# sourceMappingURL=businessModel.js.map