import type { NotificationProp } from "../types";
import { Alert } from "@mui/material";

const Notification = ({errorNotification, successNotification}: NotificationProp) => {

  if (errorNotification) {
    console.log(errorNotification)
  return (
    <Alert severity="error">{errorNotification}</Alert>
  )
}
if (successNotification) {
  return (
    <Alert severity="success">{successNotification}</Alert>
  )
}
else return null 
}

export default Notification;