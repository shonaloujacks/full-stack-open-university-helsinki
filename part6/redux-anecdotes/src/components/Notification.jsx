import { useSelector } from "react-redux"

const Notification = () => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const message = useSelector(state => state.notification)
  console.log(message)


  return message ? <div style={style}>{message}</div> : null

}

export default Notification
