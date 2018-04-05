const uuidv4 = require('uuid/v4');

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Businesses', {
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
		address: {
			allowNull: false,
			type: Sequelize.STRING
		},
		description: {
			allowNull: false,
			type: Sequelize.STRING
		},
		location: {
			allowNull: false,
			type: Sequelize.STRING
		},
		category: {
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
		},
		userId: {
			type: Sequelize.INTEGER,
			onDelete: 'CASCADE',
			references: {
				model: 'Users',
				key: 'id',
				as: 'userId',
			},
		},
	}),
	down: (queryInterface, Sequelize) => queryInterface.dropTable('Businesses')
};
