const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, require: true, allowNull: false },
  password: { type: DataTypes.STRING, require: true, allowNull: false },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
})

module.exports = User
