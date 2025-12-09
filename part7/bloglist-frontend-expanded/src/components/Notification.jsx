import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const Notification = () => {
  const { notification } = useContext(NotificationContext)
  const { message, type } = notification

  if (!message) return null

  const style = {
    border: 'solid',
    padding: 10,
    marginBottom: 10,
    color: type === 'error' ? 'red' : 'green',
  }

  return <div style={style}>{message}</div>
}

export default Notification
