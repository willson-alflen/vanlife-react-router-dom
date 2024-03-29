import { createContext, useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import PropTypes from 'prop-types'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [ratedVans, setRatedVans] = useState([])
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
        setRatedVans(authUser.ratedVans || [])
      } else {
        setUser(null)
        setRatedVans([])
      }
    })

    return () => unsubscribe()
  }, [auth])

  const addRatedVan = (vanId) => {
    setRatedVans((prevRatedVans) => [...prevRatedVans, vanId])
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
