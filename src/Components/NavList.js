import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../Redux/Actions/userActions'

const NavList = () => {

  const user = useSelector(state => state.userReducer.user)
  const token = localStorage.getItem('token')

  const dispatch = useDispatch()

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {/* Home link is always visible */}
              <Link to={'/'}><li>
                <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
              </li></Link>

              {/* Conditionally render profile, logout, login, and register links */}
              {user && token ? (
                <>
                  <Link to={'/Profile'}>
                    <li>
                      <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Profile</a>
                    </li>
                  </Link>
                  <Link onClick={() => dispatch(logout())}>
                    <li>
                      <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Logout</a>
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={'/Login'}>
                    <li>
                      <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Login</a>
                    </li>
                  </Link>
                  <Link to={'/Register'}>
                    <li>
                      <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Register</a>
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavList
