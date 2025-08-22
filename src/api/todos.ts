import { Todo, TodoInfo, ActivTodosStatus, TodoRequest } from "../types/common"
import { MetaResponse } from "../types/api"
import axios, { AxiosInstance } from "axios"

const apiInstance: AxiosInstance = axios.create({
    baseURL: "https://easydev.club/api/v1",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
})

export async function getTodos(
  status: ActivTodosStatus = "all"
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await apiInstance.get("/todos", {
    params: { filter: status },
  })
  return response.data
}

export async function addTodos(title: string): Promise<Todo> {
  const response = await apiInstance.post("/todos", {
    title,
    isDone: false,
  })
  return response.data
}

export async function changeTodos(
  id: number,
  { title, isDone }: TodoRequest
): Promise<Todo> {
  const response = await apiInstance.put(`/todos/${id}`, {
    title,
    isDone,
  })
  return response.data
}

export async function deleteTodos(id: number): Promise<string> {
  const response = await apiInstance.delete(`/todos/${id}`)
  return response.data
}