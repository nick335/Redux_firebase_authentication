import { createSlice } from "@reduxjs/toolkit";
import { updateEmail, updatePassword } from "firebase/auth";
import { auth } from "../../../firebase";

const initialState = {
    currentUser: '',
    loading: false,
    userData : {}
}

const authSlice = createSlice({
  name:'authSlice',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      const user = action.payload.userEmail
      // const userdata = action.payload.userData
      // state.userData = userdata
      state.currentUser = user
      console.log(state.currentUser)
    },
    logoutCurrentUser: (state) => {
      state.currentUser = ''
      state.userData={}
    },
    updateemail: (state, action) => {
      const email = action.payload
      return updateEmail(auth.currentUser, email)
    },
    updatepassword: (state, action) => {
      const password = action.payload
      return updatePassword(auth.currentUser, password)
    }
  }
})

export default authSlice.reducer;
export const {  setCurrentUser, logoutCurrentUser, updateemail, updatepassword } = authSlice.actions