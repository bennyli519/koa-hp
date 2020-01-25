/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('role', {
		role_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		role_name: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'role',
		timestamps: false
	});
};
