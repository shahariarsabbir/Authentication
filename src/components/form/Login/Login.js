import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { Navigate, Link } from 'react-router-dom'

const Login = ({ setLogin }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [redirect, setRedirect] = useState(false)

	const submit = async (e) => {
		e.preventDefault()

		try {
			await axios.post('login', { email, password })
			setLogin()
			setRedirect(true)
		} catch (err) {
			console.log(err)
		}
	}

	if (redirect) {
		return <Navigate to="/" />
	}

	return (
		<div className="login-page">
			<div className="new">
				<div className="login-card">
					<h2>Welcome Back</h2>
					<p>Login to your account</p>

					<form onSubmit={submit}>
						<input
							type="email"
							placeholder="Email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

						<button type="submit">Sign In</button>
					</form>

					<div className="links">
						<Link to="/forgot">Forgot password?</Link>
						<Link to="/register">Create account</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
