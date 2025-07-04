import { request } from "./apiBasic"
import { Todo, TodoInfo, ActivTodosStatus, TodoRequest } from "../types/common"
import { MetaResponse } from "../types/api"

export async function getTodos(status: ActivTodosStatus = "all"): Promise<MetaResponse<Todo, TodoInfo>> {
    return request(`/todos?filter=${status}`)
}

export async function addTodos(title: string): Promise<Todo> {
    return request("/todos", {
        method: 'POST',
        data: {
            title: title,
            isDone: false,
        }
    })
}

export async function changeTodos(id: number, {title, isDone}: TodoRequest): Promise<Todo> {
    return request(`/todos/${id}`, {
        method: 'PUT',
        data: {
            title: title,
            isDone: isDone,
        }
    })
}

export async function deleteTodos(id: number): Promise<string> {
    return request(`/todos/${id}`, {
        method: 'DELETE',
    })
}