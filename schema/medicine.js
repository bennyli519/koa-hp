/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('medicine', {
		medicine_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		m_name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		m_type: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		m_quality: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		m_price: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		m_date: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'medicine',
		timestamps: false
	});
};
