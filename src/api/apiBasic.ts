const API_BASE_URL: string = "https://easydev.club/api/v1"

export async function request(endpoint: string, options?: object) {
    const response: Response = await fetch(`${API_BASE_URL}${endpoint}`, options)

    if(!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const contentLength = response.headers.get("Content-Length")
    if (contentLength === "0") {
        return null
    }
         
    return await response.json()
}