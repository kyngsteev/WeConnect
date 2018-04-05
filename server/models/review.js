module.exports = (sequelize, DataTypes) => {
	let Review = sequelize.define('Review', {
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			primaryKey: true
		},
		title: DataTypes.STRING,
		description: DataTypes.STRING
	}, {});
	Review.associate = (models) => {
		Review.belongsTo(models.Business, {
			foreignKey: 'businessId',
			onDelete: 'CASCADE',
		});
	};
	return Review;
};
