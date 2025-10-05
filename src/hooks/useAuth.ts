import { signin, refreshToken, logout } from "../api/auth"
import { setTokens, outTokens } from "../store/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { AuthData, AuthState, RefreshToken } from "../types/auth"

export const useAuth = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state: any) => state.auth)
  const isAuthenticated = !!auth.accessToken

  const login = async (values: AuthData) => {
    const tokens = await signin(values)

    localStorage.setItem("accessToken", tokens.accessToken)
    localStorage.setItem("refreshToken", tokens.refreshToken)

    dispatch(setTokens(tokens))
  }

  const refresh = async () => {
    const tokens = auth.refreshToken
    const newTokens = await refreshToken({ refreshToken: tokens })

    localStorage.setItem("accessToken", newTokens.accessToken)
    localStorage.setItem("refreshToken", newTokens.refreshToken)

    dispatch(setTokens(newTokens))
  }

  const exit = async () => {
    await logout()

    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")

    dispatch(outTokens())
  }

  return {
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
    isAuthenticated,
    login,
    refresh,
    exit,
  }
}
