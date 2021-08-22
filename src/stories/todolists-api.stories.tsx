import React, {useEffect, useState} from 'react'
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
  const [title, setTitle] = useState<string>('')

  const addTodolist = () => {
    todolistsApi.createTodolist(title)
      .then((res) => {
        debugger
        setState(res.data)
      })
  }

  return <div>
    <div>
      <input placeholder={'todolist Title'} value={title} onChange={(e) => {
        setTitle(e.currentTarget.value)
      }}/>
      <button onClick={addTodolist}>add todolist</button>
    </div>
    {JSON.stringify(state)}
  </div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')

  const deleteTodolist = () => {
   todolistsApi.deleteTodolist(todolistId)
      .then((res) => {
        debugger;
        setState(res.data)
      })
  }

  return <div>
    <div>
      <input placeholder={'Todolist id'} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <button onClick={deleteTodolist}>Delete todolist</button>
    </div>
    {JSON.stringify(state)}
  </div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')


  const updateTodolistTitle = () => {
    todolistsApi.updateTodolist(todolistId, title)
      .then((res) => {
        setState(res.data)
      })
  }

  return <div>
    <div>
      <input placeholder={'New todolist title'} value={title} onChange={(e) => {
        setTitle(e.currentTarget.value)
      }}/>
      <input placeholder={'todolist id'} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <button onClick={updateTodolistTitle}>Update todolist title</button>
    </div>
    {JSON.stringify(state)}
  </div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')

 const getTasks = () => {
    todolistsApi.getTasks(todolistId)
      .then((res) => {
        setState(res.data)
      })
  }

  return <div>
    <div>
      <input placeholder={'todolist id'} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <button onClick={getTasks}>get tasks</button>
    </div>
    {JSON.stringify(state)}
  </div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')

  const createTask = () => {
    todolistsApi.createTask(todolistId, taskTitle)
      .then((res) => {
        setState(res.data);
      })

  }

  return <div>
    <div>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <input placeholder={'Task Title'} value={taskTitle} onChange={(e) => {
        setTaskTitle(e.currentTarget.value)
      }}/>
      <button onClick={createTask}>Create task</button>
    </div>
    {JSON.stringify(state)}
  </div>
}

export const DeleteTask = () => {

  const [state, setState] = useState<any>(null)
  const [taskId, setTaskId] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')

  const deleteTask = () => {
    todolistsApi.deleteTask(todolistId, taskId)
      .then((res) => {
        setState(res.data)
      })
  }

  return <div>
    <div>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <input placeholder={'taskId'} value={taskId} onChange={(e) => {
        setTaskId(e.currentTarget.value)
      }}/>
      <button onClick={deleteTask}>delete task</button>
    </div>
    {JSON.stringify(state)}
  </div>
}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>('title 1')
  const [description, setDescription] = useState<string>('description 1')
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)
  const [startDate, setStartDate] = useState<string>('')
  const [deadline, setDeadline] = useState<string>('')

  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')

  const updateTask = () => {

    todolistsApi.updateTask(todolistId, taskId, {
      title: title,
      description: description,
      status: status,
      priority: priority,
      startDate: '', //'2021-08-19T13:12:11.577',
      deadline: '' //'2021-08-19T13:12:11.577'
    })
      .then((res) => {
        setState(res.data)
      })

  }

  return <div>
    <div>
      <input placeholder={'Task id'} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
      <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
      <input placeholder={'Task title'} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
      <input placeholder={'Description'} value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
      <input placeholder={'status'} value={status} type='number' onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
      <input placeholder={'priority'} value={priority} type='number' onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
      <button onClick={updateTask}>Update task</button>
    </div>
    {JSON.stringify(state)}
  </div>
}
