'use strict'
const {
	Model, DataTypes,
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	User.init({
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		email: { type: DataTypes.STRING, require: true, allowNull: false },
		password: { type: DataTypes.STRING, require: true, allowNull: false },
		isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
		activationLink: { type: DataTypes.STRING },
	}, {
		sequelize,
		modelName: 'User',
	})
	return User
}