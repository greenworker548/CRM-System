const API_BASE_URL = "https://easydev.club/api/v1"

export async function request(endpoint, options) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options)

    if(!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const contentLength = response.headers.get("Content-Length")
    if (contentLength === "0") {
        return null
    }
         
    return await response.json()
}