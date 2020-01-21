/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('patient', {
		patient_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		p_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		p_gender: {
			type: DataTypes.STRING(2),
			allowNull: false
		},
		p_age: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		p_phone: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		p_address: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		doctor_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		tableName: 'patient',
		timestamps: false
	});
};
