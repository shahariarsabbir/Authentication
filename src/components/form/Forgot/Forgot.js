import React, { useState } from 'react'
import './Forgot.css'
import axios from 'axios'

const Forgot = () => {
	const [email, setEmail] = useState('')
	const [notify, setNotify] = useState({
		show: false,
		error: false,
		message: '',
	})

	const submit = async (e) => {
		e.preventDefault()
		try {
			await axios.post('forgot', { email })
			setNotify({
				show: true,
				error: false,
				message: 'Email was sent',
			})
		} catch (e) {
			setNotify({
				show: true,
				error: true,
				message: 'Email does not exist',
			})
		}
	}
	let info
	if (notify.show) {
		info = (
			<div
				className={notify.error ? 'alert alert-danger' : 'alert alert-success'}
				role="alert"
			>
				{notify.message}
			</div>
		)
	}
	return (
		<div className="bg">
			{info}
			<form onSubmit={submit} className="form">
				<h5>Enter Your mail</h5>

				<input
					type="email"
					className="form-control mb-3"
					id="floatingInput"
					placeholder="Enter your mail"
					autoComplete="email"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<button type="submit" className="btn btn-primary btn-lg btn-block">
					Send Email
				</button>

				<p className="mt-5 mb-3 text-secondary ">&copy; 2017–2021</p>
			</form>
		</div>
	)
}

export default Forgot
