const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

// ─── REGISTER ───────────────────────────────────────────
exports.register = async (req, res) => {
	const { first_name, last_name, email, password, password_confirm } = req.body

	if (password !== password_confirm) {
		return res.status(400).json({ message: 'Passwords do not match' })
	}

	const existing = await User.findOne({ email })
	if (existing) {
		return res.status(400).json({ message: 'Email already in use' })
	}

	const hashed = await bcrypt.hash(password, 10)
	await User.create({ first_name, last_name, email, password: hashed })

	res.status(201).json({ message: 'Registered successfully' })
}

// ─── LOGIN ───────────────────────────────────────────────
exports.login = async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })
	if (!user) return res.status(404).json({ message: 'User not found' })

	const valid = await bcrypt.compare(password, user.password)
	if (!valid) return res.status(401).json({ message: 'Wrong password' })

	// Sign JWT and send it as an HTTP-only cookie (safe from JS access)
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '7d',
	})

	res.cookie('token', token, {
		httpOnly: true, // not accessible via JS
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
		sameSite: 'lax',
	})

	res.json({ message: 'Logged in' })
}

// ─── LOGOUT ──────────────────────────────────────────────
exports.logout = (req, res) => {
	res.clearCookie('token')
	res.json({ message: 'Logged out' })
}

// ─── FORGOT PASSWORD ─────────────────────────────────────
exports.forgot = async (req, res) => {
	const { email } = req.body

	const user = await User.findOne({ email })
	if (!user) return res.status(404).json({ message: 'Email does not exist' })

	// Create a random token and save it to the user
	const token = crypto.randomBytes(32).toString('hex')
	user.reset_token = token
	user.token_expiry = Date.now() + 3600000 // 1 hour from now
	await user.save()

	// Send email with reset link
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
	})

	const resetLink = `${process.env.CLIENT_URL}/reset/${token}`

	await transporter.sendMail({
		from: process.env.EMAIL_USER,
		to: email,
		subject: 'Password Reset',
		html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 1 hour.</p>`,
	})

	res.json({ message: 'Email was sent' })
}

// ─── RESET PASSWORD ──────────────────────────────────────
exports.reset = async (req, res) => {
	const { token, password, password_confirm } = req.body

	if (password !== password_confirm) {
		return res.status(400).json({ message: 'Passwords do not match' })
	}

	// Find user by token and make sure it hasn't expired
	const user = await User.findOne({
		reset_token: token,
		token_expiry: { $gt: Date.now() },
	})

	if (!user)
		return res.status(400).json({ message: 'Token invalid or expired' })

	user.password = await bcrypt.hash(password, 10)
	user.reset_token = undefined // clear the token after use
	user.token_expiry = undefined
	await user.save()

	res.json({ message: 'Password reset successfully' })
}
