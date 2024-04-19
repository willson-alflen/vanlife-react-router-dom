import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import VanLoadingSpinner from '../VanLoadingSpinner'

export default function AuthRequired() {
  const { user, isLoading } = useContext(UserContext)

  if (isLoading) {
    return <VanLoadingSpinner />
  }

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
