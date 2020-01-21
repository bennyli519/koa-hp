/*
 * @Description: 
 * @Author: Benny
 * @Date: 2020-01-20 11:20:14
 * @LastEditTime: 2020-01-21 11:28:33
 */
/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('appoint', {
		appoint_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		office_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'office',
				key: 'office_id'
			}
		},
		doctor_id: {
			type: DataTypes.INTEGER,
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
