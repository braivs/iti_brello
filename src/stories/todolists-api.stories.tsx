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
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '3768c741-363d-460c-b7e4-6aa5096bdbfe'
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

