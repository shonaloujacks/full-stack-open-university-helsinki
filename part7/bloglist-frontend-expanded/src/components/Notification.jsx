import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'
import { Alert } from '@mui/material'

const Notification = () => {
  const { notification } = useContext(NotificationContext)
  const { message, type } = notification

  if (!message) return null

  return <Alert severity={type}>{message}</Alert>
}

export default Notification
