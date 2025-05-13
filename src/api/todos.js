import { request } from "./apiBasic"

export async function getTodos(status = "all") {
    return request(`/todos?filter=${status}`)
}

export async function addTodos(title) {
    return request("/todos", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            isDone: false,
        })
    })
}

export async function changeTodos(id, title, isDone) {
    return request(`/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            isDone: isDone,
        })
    })
}

export async function deleteTodos(id) {
    return request(`/todos/${id}`, {
        method: 'DELETE',
    })
}