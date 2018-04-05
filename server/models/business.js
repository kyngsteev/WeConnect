module.exports = (sequelize, DataTypes) => {
	let Business = sequelize.define('Business', {
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			primaryKey: true
		},
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
		Business.belongsTo(models.User, {
			foreignKey: 'userId',
			onDelete: 'CASCADE',
		});
	};
	return Business;
};
