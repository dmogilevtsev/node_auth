const Router = require('express')
const { body } = require('express-validator')
const authController = require('./auth.controller')
const authMiddleware = require('./auth.middleware')

const router = new Router()

router.post(
  '/registration',
  body('email', 'Incrorrect email').isEmail(),
  body('password', 'Password must be longer than 5 chars').isLength({ min: 6 }),
  authController.registration
)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)
router.get('/users', authMiddleware, authController.getUsers)

module.exports = router
