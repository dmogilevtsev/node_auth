const bcrypt = require('bcrypt')
const User = require('../user/User')
const ApiError = require('../error/ApiError')
const tokenService = require('../token/token.service')
const UserPayloadDto = require('./dto/user-payload.dto')

class AuthService {
	async login(email, password) {
		const user = await User.findOne({ where: { email } })
		if ( !user ) {
			throw ApiError.badRequest('User not found')
		}
		if ( !user.isActivated ) {
			throw ApiError.badRequest('User is not activated!')
		}
		const isMatch = await bcrypt.compare(password, user.password)
		if ( !isMatch ) {
			throw ApiError.badRequest('Not valid password')
		}
		return await this.tokens(user)
	}

	async logout(refreshToken) {
		return await tokenService.removeToken(refreshToken)
	}

	async activate(activationLink) {
		const user = await User.findOne({ where: { activationLink } })
		if ( !user ) {
			throw ApiError.badRequest('Not valid activation link')
		}
		user.isActivated = true
		user.activationLink = null
		await user.save()
	}

	async refresh(refreshToken) {
		if ( !refreshToken ) {
			throw ApiError.unauthorized()
		}
		const userData = await tokenService.refreshValidate(refreshToken)
		const refreshTokenFromDb = await tokenService.findToken(refreshToken)
		if ( !userData || !refreshTokenFromDb ) {
			throw ApiError.unauthorized()
		}
		const user = await User.findByPk(userData.id)
		return await this.tokens(user)
	}

	async tokens(user) {
		const userDto = new UserPayloadDto(user)
		const tokens = await tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)
		return {
			...tokens,
			user: userDto,
		}
	}
}

module.exports = new AuthService()
