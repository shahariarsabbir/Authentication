const User = require('../models/User')

exports.getUser = async (req, res) => {
  const user = await User.findById(req.userId).select('-password')
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
}
