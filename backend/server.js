const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()
connectDB()

app.use(
	cors({
		origin: process.env.CLIENT_URL, // your React app
		credentials: true, // allow cookies
	}),
)
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/', require('./routes/authRoutes'))
app.use('/', require('./routes/userRoutes'))

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`)
})
