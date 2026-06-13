import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../../shared/header/Header'
import './Home.css'

const Home = ({ user }) => {
	let message
	if (user) {
		message = `Hi ${user.first_name} ${user.last_name}`
	} else {
		message = 'You are not logged in'
	}

	return (
		<div className="main">
			<div className="main-outer-section">
				<h1>{message}</h1>
			</div>
			<div className="main-section"></div>
		</div>
	)
}

export default Home
