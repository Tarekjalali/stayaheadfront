import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const user = useSelector(state => state.userReducer.user)
  const token = localStorage.getItem('token')

  return user && token ? children : <Navigate to="/" />
}

export default PrivateRoute
