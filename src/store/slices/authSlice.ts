import { createSlice } from "@reduxjs/toolkit"
import { AuthState } from "../../types/auth"

const initialState: AuthState = {
  isAuthenticated: false,
  // accessToken: null,
  refreshToken: localStorage.getItem("refreshToken"),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setTokens: (state, action) => {
      state.refreshToken = action.payload.refreshToken
    },
    outTokens: (state) => {
      state.refreshToken = null
    },
  },
})

export const { setAuthenticated, setTokens, outTokens } = authSlice.actions
export default authSlice.reducer
