const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	reset_token: { type: String }, // for forgot password
	token_expiry: { type: Date }, // token expiration time
})

module.exports = mongoose.model('User', UserSchema)
