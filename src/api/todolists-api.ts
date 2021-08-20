import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    'api-key': '06e9c310-f07c-441a-811c-ffc5ac00e636'
  }
}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings
})

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

type ResponseType<D = {}> = {
  fieldsErrors: Array<string>
  resultCode: number
  messages: Array<string>
  data: D
}

export type TasksType = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TasksType[]
}

export const todolistsApi = {
  getTodolists() {
    const promise = instance.get<TodolistType[]>('todo-lists');
    return promise;
  },
  createTodolist(title: string) {
    const promise = instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title});
    return promise;
  },
  deleteTodolist(id: string) {
    const promise = instance.delete<ResponseType>(`todo-lists/${id}`);
    return promise;
  },
  updateTodolist(id: string, title: string) {
    const promise = instance.put<ResponseType>(`todo-lists/${id}`, {title: title});
    return promise;
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  }
}