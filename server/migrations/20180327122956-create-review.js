module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Reviews', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		title: {
			allowNull: false,
			type: Sequelize.STRING
		},
		description: {
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
	down: (queryInterface, Sequelize) => queryInterface.dropTable('Reviews')
};
