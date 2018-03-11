const express = require('express');

const router = express.Router();
// get data model
global.businesses = [
	{
		id: 1,
		bizName: 'ABC Transport Limited',
		bizAddress: '34 XYZ street, Lagos'
	},

	{
		id: 2,
		bizName: 'Iya Photo Images',
		bizAddress: '1 Cyclone Causeway, Jos'
	},

	{
		id: 3,
		bizName: 'Emeka Metal Works',
		bizAddress: '55, Jabulani Cresent, Enugu'
	}
];

// get all Businesses

// exports.getBusinesses = (req, res) => {
// 	BusinessData.find({}, (err, business) => {
// 		if (err) {
// 			res.send(err);
// 		}
// 		res.json(business);
// 	});
// };

router.get('/', (res, req) => res.json({
	businesses: global.businesses,
	error: false
}));

module.exports = router;
