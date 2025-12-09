import { createContext, useContext, useReducer, useEffect } from 'react'
import blogService from '../services/blogs'

const UserContext = createContext()

const initialState = null

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, initialState)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON)
      dispatch({ type: 'SET_USER', payload: storedUser })
      blogService.setToken(storedUser.token)
    }
  }, [])

  const login = (userData) => {
    dispatch({ type: 'SET_USER', payload: userData })
    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(userData))
    blogService.setToken(userData.token)
  }

  const logout = () => {
    dispatch({ type: 'CLEAR_USER' })
    window.localStorage.removeItem('loggedNoteappUser')
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
