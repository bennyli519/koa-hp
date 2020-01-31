/*
 * @Description: 
 * @Author: Benny
 * @Date: 2020-01-31 13:12:51
 * @LastEditTime: 2020-01-31 16:25:54
 */
/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		user_pwd: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		user_type: {
			type: DataTypes.INTEGER(2),
			allowNull: false
		}
	}, {
		tableName: 'user',
		timestamps: false
	});
};
