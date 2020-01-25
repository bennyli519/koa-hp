/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		user_pwd: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		user_type: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		tableName: 'user',
		timestamps: false
	});
};
