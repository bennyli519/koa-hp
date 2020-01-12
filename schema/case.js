/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('case', {
		case_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		office_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		c_content: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		c_conclude: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		c_suggest: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		c_date: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'case',
		timestamps: false
	});
};
