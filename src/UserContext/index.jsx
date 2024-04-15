import { createContext, useEffect, useReducer } from 'react'
import { auth } from '../api'
import PropTypes from 'prop-types'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user }
    case 'SET_RATED_VANS':
      return { ...state, ratedVans: action.ratedVans }
    case 'REMOVE_USER':
      return { user: null, ratedVans: [] }
    default:
      throw new Error()
  }
}

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    ratedVans: [],
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: 'SET_USER', user: authUser })
        dispatch({
          type: 'SET_RATED_VANS',
          ratedVans: authUser.ratedVans || [],
        })
      } else {
        dispatch({ type: 'REMOVE_USER' })
      }
    })

    return () => unsubscribe()
  }, [])

  const addRatedVan = (vanId) => {
    dispatch({ type: 'SET_RATED_VANS', ratedVans: [...state.ratedVans, vanId] })
  }

  return (
    <UserContext.Provider value={{ ...state, dispatch, addRatedVan }}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node,
}

export { UserContext, UserProvider }
