import { createSlice } from "@reduxjs/toolkit" 

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    displayNotification(state, action){
    return action.payload 
    }
  }

})

export const { displayNotification } = notificationSlice.actions
export default notificationSlice.reducer