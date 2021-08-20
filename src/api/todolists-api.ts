import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    'api-key': '06e9c310-f07c-441a-811c-ffc5ac00e636'
  }
}

export const todolistsApi = {
  getTodolists() {
    const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    return promise
  },
  createTodolist(title: string) {
    const promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title} ,settings)
    return promise
  },
  deleteTodolist(id: string) {
    const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
    return promise
  },
  updateTodolist(id: string, title: string) {
    const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title} ,settings)
    return promise
  }
}