import { setTokens, logout } from "../store/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"

export const useAuth = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state: any) => state.auth)
  const isAuthenticated = !!auth.accessToken

  const login = async (tokens: {
    accessToken: string
    refreshToken: string
  }) => {
    dispatch(setTokens(tokens))
  }

  return {
    accessToken: auth.accessToken,
    isAuthenticated,
    login,
    logout: () => dispatch(logout()),
  }
}
