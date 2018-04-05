const uuidv4 = require('uuid/v4');

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Reviews', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.UUID,
			defaultValue: uuidv4()
		},
		title: {
			allowNull: false,
			type: Sequelize.STRING
		},
		description: {
			allowNull: false,
			type: Sequelize.STRING
		},
		businessId: {
			type: Sequelize.UUID,
			onDelete: 'CASCADE',
			references: {
				model: 'Business',
				key: 'id',
				as: 'businessId',
			},
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
	down: (queryInterface, Sequelize) => queryInterface.dropTable('Reviews')
};
