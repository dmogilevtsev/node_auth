const bcrypt = require('bcrypt')
const { v4 } = require('uuid')
const ApiError = require('../error/ApiError')
const User = require('./User')

class UserService {
  async create(email, password) {
    const user = await User.findOne({ where: { email } })
    if (user) {
      throw ApiError.badRequest(`User with "${email}" already exist`)
    }
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    return await User.create({
      email,
      password: hashedPassword,
      activationLink: v4(),
    })
  }

  async getAll() {
    return await User.findAll()
  }
}

module.exports = new UserService()
