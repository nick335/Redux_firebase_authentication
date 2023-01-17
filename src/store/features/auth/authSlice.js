import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../../firebase";

const initialState = {
    currentUser: false,
    loading: false
}

const authSlice = createSlice({
  name:'authSlice',
  initialState,
  reducers: {
    signup: (state,action) => {
      console.log(action)
      const email = action.payload.email
      const password = action.payload.password

      return auth.createUserWithEmailAndPassword(email, password)
    }
  }
})

export default authSlice.reducer;
export const { signup } = authSlice.actions