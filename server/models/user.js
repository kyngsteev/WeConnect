module.exports = (sequelize, DataTypes) => {
	let User = sequelize.define('User', {
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING
	}, {});
	User.associate = (models) => {
		User.hasMany(models.Business, {
			foreignKey: 'userId',
			as: 'businessItems',
		});
	};
	return User;
};
