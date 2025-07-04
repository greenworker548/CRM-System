import axios, { AxiosResponse } from "axios"

axios.defaults.baseURL = "https://easydev.club/api/v1"
axios.defaults.timeout = 5000
axios.defaults.headers.post["Content-Type"] = "application/json"
axios.defaults.headers.put["Content-Type"] = "application/json"

export const request = async function(endpoint: string, options?: object) {
    const response: AxiosResponse = await axios({
        url: endpoint,
        ...options,
    })

    if (response.data === null || response.data === undefined) {
        return null
    }

    return response.data
}