import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE' :
      return `Anecdote '${action.payload}' voted`
  
    case 'ADD' :
      return `Anecdote '${action.payload}' added`
    
    case 'ERROR' :
      return 'Anecdote is too short, must have length 5 or more'
    
    case 'CLEAR' : 
      return ''

    default:
      return state
  }
}

const NotificationContext = createContext ()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch}}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext