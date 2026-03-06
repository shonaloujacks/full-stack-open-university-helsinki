import { Alert } from '@mui/material'


interface NotificationProps {
  successNotification: string,
  errorNotification: string,
}

const Notification = ({successNotification, errorNotification}: NotificationProps) => {

  return (
  <div>
    {successNotification ? <Alert severity='success'>{successNotification}</Alert> : ''}
    
    {errorNotification ? <Alert severity='error'>{errorNotification}</Alert> : ''}
  </div>
  )
}

export default Notification;