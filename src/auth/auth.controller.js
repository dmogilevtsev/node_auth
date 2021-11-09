const { validationResult } = require('express-validator')
const ApiError = require('../error/ApiError')
const userService = require('../user/user.service')
const authService = require('./auth.service')
const config = require('../config')
const mailService = require('../mail/mail.service')
const tokenService = require('../token/token.service')

const MAX_AGE = 30 * 24 * 60 * 60 * 1000 // 30 days

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Validation error', errors.array()))
      }
      const { email, password } = req.body
      const user = await userService.create(email, password)
      const data = await authService.tokens(user)
      await mailService.sendActivationLink(
        email,
        `${config.host}${config.port}/api/activate/${user.activationLink}`
      )
      res.cookie('refreshToken', data.refreshToken, {
        maxAge: MAX_AGE,
        httpOnly: true,
      })
      return res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const data = await authService.login(email, password)
      res.cookie('refreshToken', data.refreshToken, {
        maxAge: MAX_AGE,
        httpOnly: true,
      })
      return res.json(data)
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const result = await authService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(result)
    } catch (error) {
      next(error)
    }
  }

  async activate(req, res, next) {
    try {
      const { link } = req.params
      await authService.activate(link)
      return res.redirect(`${config.client_url}/`)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req, res, next) {
    try {
      const authHeaer = req.headers.authorization
      if (!authHeaer) {
        return next(ApiError.unauthorized())
      }
      const accessToken = authHeaer.split(/\s/)[1]
      if (!accessToken) {
        return next(ApiError.unauthorized())
      }
      const { refreshToken } = req.cookies
      const isValidAccess = await tokenService.accessValidate(accessToken)
      if (isValidAccess) {
        return res.json({
          accessToken,
          refreshToken,
          user: isValidAccess,
        })
      } else {
        const data = await authService.refresh(refreshToken)
        res.cookie('refreshToken', data.refreshToken, {
          maxAge: MAX_AGE,
          httpOnly: true,
        })
        return res.status(201).json(data)
      }
    } catch (error) {
      next(error)
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAll()
      return res.json(users)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AuthController()
