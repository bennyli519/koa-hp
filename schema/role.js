/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('role', {
		role_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
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
