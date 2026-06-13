import React from 'react'
import { NavLink, Link, data } from 'react-router-dom'
import Home from '../../components/pages/Home/Home'
import Login from '../../components/form/Login/Login'
import './Header.css'
import axios from 'axios'

const Header = ({ user, setLogin }) => {
	const logout = async () => {
		await axios.post('logout', {})

		setLogin()
	}

	let links
	if (user) {
		links = (
			<div className="push">
				<NavLink to="/" onClick={logout}>
					Logout
				</NavLink>
			</div>
		)
	} else {
		links = (
			<div className="push">
				<NavLink to="/login">Login</NavLink>
				<NavLink to="/register">Sign up</NavLink>
			</div>
		)
	}
	return (
		<div className="">
			<nav>
				<NavLink
					className={({ isActive }) => (isActive ? 'active' : undefined)}
					to="/home"
				>
					Home
				</NavLink>
				<NavLink to="/about">About</NavLink>
				{links}
			</nav>
		</div>
	)
}

export default Header
