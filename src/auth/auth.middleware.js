const ApiError = require('../error/ApiError')
const tokenService = require('../token/token.service')

module.exports = async (req, res, next) => {
	try {
		const authHeaer = req.headers.authorization
		if ( !authHeaer ) {
			return next(ApiError.unauthorized())
		}
		const accessToken = authHeaer.split(/\s/)[1]
		if ( !accessToken ) {
			return next(ApiError.unauthorized())
		}
		const userData = await tokenService.accessValidate(accessToken)
		if ( !userData ) {
			return next(ApiError.unauthorized())
		}
		req.user = userData
		next()
	} catch ( error ) {
		return next(ApiError.unauthorized())
	}
}
