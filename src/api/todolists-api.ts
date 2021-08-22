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
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

type UpdateTaskModelType = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}

type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TasksType[]
}

// tried to fix server error
/*const errorEmulation = {
data:{}, messages: ["The Title field is required. (Title)"],"fieldsErrors":[],"resultCode":1
}*/

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
    debugger
    const promise = instance.delete<ResponseType>(`todo-lists/${id}`)
      // : new Promise((res, rej) => {res({errorEmulation})}); // tried to fix server error
      // : 'id is required';
    return promise;
  },
  updateTodolist(id: string, title: string) {
    const promise = instance.put<ResponseType>(`todo-lists/${id}`, {title: title});
    return promise;
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, taskTitle: string) {
    let promise = instance.post<ResponseType<{ item: TasksType }>>(`/todo-lists/${todolistId}/tasks`, {title: taskTitle})
    return promise
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<{ item: TasksType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  }
}