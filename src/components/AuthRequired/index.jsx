import { Navigate, Outlet } from 'react-router-dom'

export default function AuthRequired() {
  const isLoggedIn = localStorage.getItem('loggedIn')

  if (!isLoggedIn) {
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
