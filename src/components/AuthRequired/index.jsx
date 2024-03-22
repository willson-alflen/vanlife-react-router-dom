import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../UserContext'

export default function AuthRequired() {
  const { user } = useContext(UserContext)
  console.log('user', user)

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ message: 'You must log in first' }}
        replace
      />
    )
  }

  return <Outlet />
}
