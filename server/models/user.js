module.exports = (sequelize, DataTypes) => {
	let User = sequelize.define('User', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING
	}, {});
	User.associate = (models) => {
		User.hasMany(models.Business, {
			foreignKey: 'userId'
		});
	};
	return User;
};
