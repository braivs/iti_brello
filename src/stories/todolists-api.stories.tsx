import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {todolistsApi} from "../api/todolists-api";

export default {
  title: 'API'
}

const settings = {
  withCredentials: true,
  headers: {
    'api-key': '06e9c310-f07c-441a-811c-ffc5ac00e636'
  }
}

export const GetTodolists = () => {

  const [state, setState] = useState<any>(null)

  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    todolistsApi.getTodolists()
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    //axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'Briws todolist'} ,settings)
    todolistsApi.createTodolist('Briws blabla todolist')
      .then((res) => {
        debugger
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '8ef303a9-55dc-4f43-8f95-e4677e0ed11b'
    todolistsApi.deleteTodolist(todolistId)
      .then((res) => {
        debugger;
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    const todolistId = '117d1769-efec-46a3-aea9-4ab9b4dd5da1'
    const title = 'MagicHey'
    todolistsApi.updateTodolist(todolistId, title)
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {

  const [state, setState] = useState<any>(null)

  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    const todolistId = 'f087338b-f94f-4a5c-8b50-0d9abe22991c';
    todolistsApi.getTasks(todolistId)
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {

  const [state, setState] = useState<any>(null)

  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    const todolistId = 'f087338b-f94f-4a5c-8b50-0d9abe22991c';
    const taskId = 'f087338b-f94f-4a5c-8b50-0d9abe22991c';
    todolistsApi.deleteTask(todolistId, taskId)
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
