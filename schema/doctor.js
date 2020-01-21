/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('doctor', {
		doctor_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		d_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		d_gender: {
			type: DataTypes.STRING(2),
			allowNull: true
		},
		d_age: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		d_phone: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		}
	}, {
		tableName: 'doctor',
		timestamps: false
	});
};
