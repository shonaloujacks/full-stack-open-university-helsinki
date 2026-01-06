import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notifications)

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
