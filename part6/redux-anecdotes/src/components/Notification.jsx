import { displayNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return <div style={style}>{displayNotification}</div>
}

export default Notification
