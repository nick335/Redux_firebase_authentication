import { createSlice } from "@reduxjs/toolkit";
// import { auth } from "../../../firebase";

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
      const user = action.payload.user
      const userdata = action.payload.userdata
      state.userData = userdata
      state.currentUser = user
      console.log(state.currentUser)
    },
    logoutCurrentUser: (state) => {
      state.currentUser = ''
      state.userData={}
    },
    updateEmail: (state, action) => {
      const email = action.payload
      return state.userData.updateEmail(email)
    },
    updatePassword: (state, action) => {
      const password = action.payload
      return state.userData.updatePassword(password)
    }
  }
})

export default authSlice.reducer;
export const {  setCurrentUser, logoutCurrentUser, updateEmail, updatePassword } = authSlice.actions