import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import './Register.css'

const Register = () => {
	const [firstname, setFirstName] = useState('')
	const [lastname, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [redirect, setRedirect] = useState(false)

	const submit = async (e) => {
		e.preventDefault()
		await axios.post('http://localhost:3001/register', {
			first_name: firstname,
			last_name: lastname,
			email: email,
			password: password,
			password_confirm: confirmPassword,
		})
		setRedirect(true)
	}

	if (redirect) {
		return <Navigate to="/login" />
	}

	return (
		<div className="container-fluid bg">
			<div className="row w-100 align-items-center">
				{/* LEFT SIDE */}
				<div className="col-md-6 text-white left-side">
					<h1>Let's Get Started</h1>
					<p>Join us and create your account</p>
				</div>

				{/* RIGHT SIDE */}
				<div className="col-md-6 right-side">
					<div className="card">
						<h2>Sign Up</h2>
						<p>Create your account</p>

						<form onSubmit={submit}>
							<input
								type="text"
								placeholder="First Name"
								onChange={(e) => setFirstName(e.target.value)}
							/>
							<input
								type="text"
								placeholder="Last Name"
								onChange={(e) => setLastName(e.target.value)}
							/>
							<input
								type="email"
								placeholder="Email"
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type="password"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<input
								type="password"
								placeholder="Confirm Password"
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>

							<button type="submit">Sign Up</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
