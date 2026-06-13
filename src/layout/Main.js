import React from 'react'
import Header from '../shared/header/Header'
import { Outlet } from 'react-router-dom'

const Main = ({ user, setLogin }) => {
	return (
		<>
			<Header user={user} setLogin={() => setLogin((prev) => !prev)} />
			<Outlet />
		</>
	)
}

export default Main
