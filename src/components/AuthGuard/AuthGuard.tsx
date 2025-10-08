import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { apiAuthInstance } from "../../api/auth"

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, accessToken, refreshToken, refresh, exit } =
    useAuth()

  // const { refreshToken, refresh, exit } = useAuth()
  // console.log(refreshToken)

  const attempt = async () => {
    try {
      console.log("вызов рефреш")
      await refresh()
      // navigate("/", { replace: true })
    } catch (error) {
      exit()
    }
  }

  useEffect(() => {
    if (!refreshToken) return

    attempt()
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return

    const interceptor = apiAuthInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && isAuthenticated) {
          try {
            const newAccessToken = await refresh()

            error.config.headers.Authorization = `Bearer ${newAccessToken}`

            return apiAuthInstance.request(error.config)
          } catch (refreshError) {
            exit()
          }
        }
        return Promise.reject(error)
      }
    )

    return () => {
      apiAuthInstance.interceptors.response.eject(interceptor)
    }
  }, [isAuthenticated, exit, refresh])

  useEffect(() => {
    const requestInterceptor = apiAuthInstance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    return () => {
      apiAuthInstance.interceptors.request.eject(requestInterceptor)
    }
  }, [accessToken])

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default AuthGuard
