import React, { useEffect, useState } from 'react'
import Login from './components/form/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/pages/Home/Home'
import About from './components/pages/About/About'
import Main from './layout/Main'
import Register from './components/form/Register/Register'
import axios from 'axios'
import Forgot from './components/form/Forgot/Forgot'

axios.defaults.baseURL = 'http://localhost:3001/'
axios.defaults.withCredentials = true

const App = () => {
	const [user, setUser] = useState(null)
	const [login, setLogin] = useState(false)
	useEffect(() => {
		;(async () => {
			try {
				const response = await axios.get('user')
				const user = response.data
				setUser(user)
			} catch (e) {
				setUser(null)
			}
		})()
	}, [login])

	const logout = async () => {
		await axios.post('logout')
		setUser(null)
		setLogin(false)
	}

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Main user={user} setLogin={setLogin} logout={logout} />,
			children: [
				{ path: '/home', element: <Home user={user} /> },
				{ path: '/about', element: <About /> },
				{
					path: '/login',
					element: <Login setLogin={() => setLogin((prev) => !prev)} />,
				},
				{ path: '/register', element: <Register /> },
				{ path: '/forgot', element: <Forgot /> },
			],
		},
	])

	return (
		<div>
			<RouterProvider router={router}></RouterProvider>
		</div>
	)
}

export default App
