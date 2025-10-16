import { createSlice } from "@reduxjs/toolkit"
import { AuthState } from "../../types/auth"

const initialState: AuthState = {
  userRoles: null,
  isAuthenticated: false,
  refreshToken: localStorage.getItem("refreshToken"),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserRoles: (state, action) => {
      state.userRoles = action.payload
    },
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

export const { setUserRoles, setAuthenticated, setTokens, outTokens } =
  authSlice.actions
export default authSlice.reducer
