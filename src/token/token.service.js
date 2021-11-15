const jwt = require('jsonwebtoken')
const Token = require('../token/Token')
const config = require('../config')
const ApiError = require('../error/ApiError')

class TokenService {
	async generateTokens(payload) {
		const accessToken = jwt.sign(payload, config.jwt.jwt_secret, {
			expiresIn: config.jwt.jwt_exp,
		})
		const refreshToken = jwt.sign(payload, config.jwt.jwt_refresh_secret, {
			expiresIn: config.jwt.jwt_refresh_exp,
		})
		return {
			accessToken,
			refreshToken,
		}
	}

	async saveToken(userId, refreshToken) {
		const data = await Token.findOne({ where: { userId } })
		if ( data ) {
			data.refreshToken = refreshToken
			return data.save()
		}
		return await Token.create({ userId, refreshToken })
	}

	async removeToken(refreshToken) {
		await Token.destroy({ where: { refreshToken } })
		return 1
	}

	async accessValidate(accessToken) {
		try {
			return jwt.verify(accessToken, config.jwt.jwt_secret)
		} catch ( error ) {
			return null
		}
	}

	async refreshValidate(refreshToken) {
		try {
			return jwt.verify(refreshToken, config.jwt.jwt_refresh_secret)
		} catch ( error ) {
			return null
		}
	}

	async findToken(refreshToken) {
		return await Token.findOne({ where: { refreshToken } })
	}
}

module.exports = new TokenService()
