
/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('doctor', {
		doctor_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		d_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		d_gender: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		d_age: {
			type: DataTypes.INTEGER(2),
			allowNull: true
		},
		d_phone: {
			type: DataTypes.STRING(11),
			allowNull: true
		},
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true
		},
		office_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
		},
	}, {
		tableName: 'doctor',
		timestamps: false
	});
};
