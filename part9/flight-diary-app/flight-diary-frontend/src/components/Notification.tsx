import type { NotificationProp } from "../types";
import { Alert } from "@mui/material";

const Notification = ({errorNotification}: NotificationProp) => {

  return (
    <Alert severity="error">{errorNotification}</Alert>
  )
}

export default Notification;