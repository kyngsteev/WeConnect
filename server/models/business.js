module.exports = (sequelize, DataTypes) => {
	let Business = sequelize.define('Business', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: DataTypes.STRING,
		address: DataTypes.STRING,
		description: DataTypes.STRING,
		location: DataTypes.STRING,
		category: DataTypes.STRING
	}, {
		freezeTableName: true
	});
	Business.associate = (models) => {
		Business.hasMany(models.Review, {
			foreignKey: 'businessId'
		});
		Business.belongsTo(models.User, {
			foreignKey: 'userId',
			onDelete: 'CASCADE',
		});
	};
	return Business;
};
