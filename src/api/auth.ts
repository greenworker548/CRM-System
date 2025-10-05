import {
  UserRegistration,
  AuthData,
  RefreshToken,
  Token,
  Profile,
} from "../types/auth"
import axios, { AxiosInstance } from "axios"

const apiAuthInstance: AxiosInstance = axios.create({
  baseURL: "https://easydev.club/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

apiAuthInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// apiAuthInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       const isAuthenticated = !!localStorage.getItem("accessToken")

//       if (!isAuthenticated) {
//         return Promise.reject(error)
//       }

//       const refToken = localStorage.getItem("refreshToken")
//       if (!refToken) {
//         logout()
//         return Promise.reject(error)
//       }

//       try {
//         const newTokens = await refreshToken({ refreshToken: refToken })
//         localStorage.setItem("accessToken", newTokens.accessToken)
//         localStorage.setItem("refreshToken", newTokens.refreshToken)

//         error.config.headers.Authorization = `Bearer ${newTokens.accessToken}`
//         return apiAuthInstance.request(error.config)
//       } catch (refreshError) {
//         logout()
//       }
//     }
//     return Promise.reject(error)
//   }
// )

export async function signup(userData: UserRegistration): Promise<Profile> {
  const response = await apiAuthInstance.post("/auth/signup", userData)
  return response.data
}

export async function signin(credentials: AuthData): Promise<Token> {
  const response = await apiAuthInstance.post("/auth/signin", credentials)
  return response.data
}

export async function refreshToken(token: RefreshToken): Promise<Token> {
  const response = await apiAuthInstance.post("/auth/refresh", token)
  return response.data
}

export async function getProfile(): Promise<Profile> {
  const response = await apiAuthInstance.get("/user/profile")
  return response.data
}

export async function logout(): Promise<void> {
  const response = await apiAuthInstance.post("/user/logout")
  return response.data
}
