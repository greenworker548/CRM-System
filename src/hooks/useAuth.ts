import { signin, refreshToken, logout } from "../api/auth"
import {
  setTokens,
  outTokens,
  setAuthenticated,
} from "../store/slices/authSlice"
import { useDispatch } from "react-redux"
import { AuthData } from "../types/auth"
import { useAppSelector } from "../store/store"

export const useAuth = () => {
  const dispatch = useDispatch()
  const auth = useAppSelector((state) => state.auth)

  const login = async (values: AuthData) => {
    const tokens = await signin(values)

    localStorage.setItem("refreshToken", tokens.refreshToken)

    dispatch(setTokens(tokens))
    dispatch(setAuthenticated(true))
  }

  const refresh = async () => {
    const refreshTokenValue = localStorage.getItem("refreshToken")
    if (!refreshTokenValue) {
      throw new Error("No refresh token")
    }

    const newTokens = await refreshToken({ refreshToken: refreshTokenValue })

    localStorage.setItem("refreshToken", newTokens.refreshToken)

    dispatch(setTokens(newTokens))
    dispatch(setAuthenticated(true))

    return newTokens.accessToken
  }

  const exit = async () => {
    localStorage.removeItem("refreshToken")

    dispatch(outTokens())
    dispatch(setAuthenticated(false))

    await logout()
  }

  return {
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
    isAuthenticated: auth.isAuthenticated,
    login,
    refresh,
    exit,
  }
}
