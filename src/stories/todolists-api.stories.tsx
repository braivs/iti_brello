import React, {useEffect, useState} from 'react'
import axios from 'axios'

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
    axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
      .then((res) => {
        setState(res.data)
      })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'Briws todolist'} ,settings)
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists/a325f6ac-dcd6-4e46-838d-e89088c6edad', settings)
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
    axios.put('https://social-network.samuraijs.com/api/1.1/todo-lists/3768c741-363d-460c-b7e4-6aa5096bdbfe', {title: 'MagicHey'} ,settings)
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

