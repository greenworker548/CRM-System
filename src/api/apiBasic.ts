import axios, { AxiosResponse } from "axios"

const API_BASE_URL: string = "https://easydev.club/api/v1"

export const request = async function(endpoint: string, options?: object) {
    const response: AxiosResponse = await axios({
        url: `${API_BASE_URL}${endpoint}`,
        ...options,
    })

    if (response.data === null || response.data === undefined) {
        return null
    }

    return response.data
}