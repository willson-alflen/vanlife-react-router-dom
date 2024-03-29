import { createContext, useState, useEffect } from 'react'
import { auth } from '../api'
import VanLoadingSpinner from '../components/VanLoadingSpinner'
import PropTypes from 'prop-types'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [ratedVans, setRatedVans] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
        setRatedVans(authUser.ratedVans || [])
      } else {
        setUser(null)
        setRatedVans([])
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const addRatedVan = (vanId) => {
    setRatedVans((prevRatedVans) => [...prevRatedVans, vanId])
  }

  if (isLoading) {
    return <VanLoadingSpinner />
  }

  return (
    <UserContext.Provider value={{ user, setUser, ratedVans, addRatedVan }}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node,
}

export { UserContext, UserProvider }
