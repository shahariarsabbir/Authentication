import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'

const ResetPassword = ({ match }) => {
	const [password, setPassword] = useState('')
	const [passwordconfirm, setPasswordConfirm] = useState('')
	const [redirect, setRedirect] = useState('')

	const submit = async (e) => {
		e.preventDefault()
		const { token } = useParams()
		await axios.post('reset', {
			token,
			password,
			password_confirm: passwordconfirm,
		})
		setRedirect(true)
	}
	if (redirect) {
		return <Navigate to="/login" />
	}
	return (
		<div>
			<div className="bg">
				<form onSubmit={submit} className="form">
					<h5>Reset your password</h5>

					<input
						type="password"
						className="form-control mb-3"
						id="floatingInput"
						placeholder="Enter new password"
						autoComplete="email"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<input
						type="password"
						className="form-control mb-3"
						id="floatingInput"
						placeholder="Confirm password"
						autoComplete="email"
						onChange={(e) => setPasswordConfirm(e.target.value)}
						required
					/>
					<button type="submit" className="btn btn-primary btn-lg btn-block">
						Reset password
					</button>

					<p class="mt-5 mb-3 text-secondary ">&copy; 2017–2021</p>
				</form>
			</div>
		</div>
	)
}

export default ResetPassword
