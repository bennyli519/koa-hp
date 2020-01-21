/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('office', {
		office_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		o_name: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'office',
		timestamps: false
	});
};
