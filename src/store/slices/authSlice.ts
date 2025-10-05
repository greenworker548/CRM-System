import { createSlice } from "@reduxjs/toolkit"
import { AuthState } from "../../types/auth"

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    outTokens: (state) => {
      state.accessToken = null
      state.refreshToken = null
    },
  },
})

export const { setTokens, outTokens } = authSlice.actions
export default authSlice.reducer
