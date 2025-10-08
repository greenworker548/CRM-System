import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { apiAuthInstance } from "../../api/auth"
import { Spin } from "antd"

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, accessToken, refreshToken, refresh, exit } =
    useAuth()
  const [loading, setLoading] = useState<boolean>(true)

  const attempt = async () => {
    try {
      await refresh()
    } catch (error) {
      exit()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (refreshToken && !isAuthenticated) {
      attempt()
    } else {
      setLoading(false)
    }
  }, [refreshToken, isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) return

    const responseInterceptor = apiAuthInstance.interceptors.response.use(
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
      apiAuthInstance.interceptors.response.eject(responseInterceptor)
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

  if (loading) {
    return <Spin fullscreen size="large" tip="Checking authentication..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default AuthGuard
