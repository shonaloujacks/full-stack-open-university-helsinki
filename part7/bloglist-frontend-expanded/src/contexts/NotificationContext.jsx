import { createContext, useReducer } from 'react'

const NotificationContext = createContext()

const initialState = { message: '', type: '' }

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return { message: action.payload.message, type: action.payload.type }
    case 'CLEAR':
      return { message: '', type: '' }
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  )

  const showNotification = (message, type = 'success', time = 5000) => {
    notificationDispatch({ type: 'SHOW', payload: { message, type } })
    setTimeout(() => notificationDispatch({ type: 'CLEAR' }), time)
  }

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
