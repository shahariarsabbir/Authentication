const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
	// JWT is sent as a cookie from the frontend
	const token = req.cookies.token

	if (!token) {
		return res.status(401).json({ message: 'Not authorized' })
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.userId = decoded.id // attach user id to request
		next()
	} catch (err) {
		return res.status(401).json({ message: 'Token invalid or expired' })
	}
}

module.exports = protect
