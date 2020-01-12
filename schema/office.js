/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('office', {
		office_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
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
