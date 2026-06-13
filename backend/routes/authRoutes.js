const express = require('express')
const router = express.Router()
const {
	register,
	login,
	logout,
	forgot,
	reset,
} = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/forgot', forgot)
router.post('/reset', reset)

module.exports = router
