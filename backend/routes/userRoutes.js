const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const { getUser } = require('../controllers/userController')

// Protected — only works if JWT cookie is present
router.get('/user', protect, getUser)

module.exports = router
