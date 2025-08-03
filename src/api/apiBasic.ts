import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios"

const apiInstance: AxiosInstance = axios.create({
    baseURL: "https://easydev.club/api/v1",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
})

export const request = async <T = any>(
    endpoint: string,
    options?: AxiosRequestConfig
): Promise<T> => {
    const response: AxiosResponse<T> = await apiInstance({
        url: endpoint,
        ...options,
    })

    if (response.data === null || response.data === undefined) {
        throw new Error("API returned null or undefined")
    }

    return response.data
}