module.exports = (sequelize, DataTypes) => {
	let Business = sequelize.define('Business', {
		name: DataTypes.STRING,
		address: DataTypes.STRING,
		description: DataTypes.STRING,
		location: DataTypes.STRING,
		category: DataTypes.STRING
	}, {});
	Business.associate = (models) => {
		Business.hasMany(models.Review, {
			foreignKey: 'businessId',
			as: 'reviewItems',
		});
	};
	Business.associate = (models) => {
		Business.belongsTo(models.User, {
			foreignKey: 'userId',
			onDelete: 'CASCADE',
		});
	};
	return Business;
};
