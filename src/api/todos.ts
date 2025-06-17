import { request } from "./apiBasic"
import { Todo, ValueOfTodosStatus } from "../types/common"
import { MetaResponse } from "../types/api"

export async function getTodos(status: string = "all"): Promise<MetaResponse<Todo, ValueOfTodosStatus>> {
    return request(`/todos?filter=${status}`)
}

export async function addTodos(title: string): Promise<Pick<Todo, "isDone" | "title">> {
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

export async function changeTodos(id: number, title: string, isDone: boolean): Promise<Pick<Todo, "isDone" | "title">> {
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

export async function deleteTodos(id: number): Promise<string> {
    return request(`/todos/${id}`, {
        method: 'DELETE',
    })
}

