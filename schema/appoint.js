/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('appoint', {
		appoint_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true
		},
		office_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			references: {
				model: 'office',
				key: 'office_id'
			}
		},
		doctor_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			references: {
				model: 'doctor',
				key: 'doctor_id'
			}
		},
		a_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		a_name: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'appoint',
		timestamps: false
	});
};
