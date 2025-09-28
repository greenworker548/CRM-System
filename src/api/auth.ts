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

export async function signup(userData: UserRegistration): Promise<Profile> {
  const response = await apiAuthInstance.post("/auth/signup", userData)
  console.log(response.data)
  return response.data
}

export async function signin(credentials: AuthData): Promise<Token> {
  const response = await apiAuthInstance.post("/auth/signin", credentials)
  console.log(response.data)
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
