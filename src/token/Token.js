const { DataTypes, Deferrable } = require('sequelize')
const User = require('../user/User')
const sequelize = require('../db')

const Token = sequelize.define('token', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING, require: true, allowNull: false },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE,
    },
  },
})

module.exports = Token
