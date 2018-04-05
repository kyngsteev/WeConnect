const uuidv4 = require('uuid/v4');

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.UUID,
			defaultValue: uuidv4()
		},
		name: {
			allowNull: false,
			type: Sequelize.STRING
		},
		email: {
			allowNull: false,
			type: Sequelize.STRING
		},
		password: {
			allowNull: false,
			type: Sequelize.STRING
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE
		}
	}),
	down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
