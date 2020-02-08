/*
 * @Description: 
 * @Author: Benny
 * @Date: 2020-01-20 11:20:14
 * @LastEditTime : 2020-02-06 00:57:31
 */
/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('appoint', {
		appoint_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		doctor_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			references: {
				model: 'doctor',
				key: 'doctor_id'
			}
		},
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			references: {
				model: 'user',
				key: 'user_id'
			}
		},
		a_time: {
			type: DataTypes.DATE,
			allowNull: true
		},
		a_name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		a_status: {
			type: DataTypes.STRING(14),
			allowNull: false
		},
		a_status: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		a_phone: {
			type: DataTypes.STRING(11),
			allowNull: false
		},
		a_reason: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'appoint',
		timestamps: false
	});
};
