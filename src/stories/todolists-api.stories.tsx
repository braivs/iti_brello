import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {TasksEntityType, todolistsApi, UpdateTaskModelType} from "../api/todolists-api";

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
  const [todolistId, setTodolistId] = useState<string>('')
  const [state, setState] = useState<any>(null)

 const getTasks = () => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
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
      <button onClick={getTasks}>get tasks from todolist</button>
    </div>
    {JSON.stringify(state)}
  </div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskTitle, setTaskTitle] = useState<string>('')

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
      <input placeholder={'title'} value={taskTitle} onChange={(e) => {
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

// Only title update here for simplify. All other fields hardcoded
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')

  const updateTask = () => {

    const data: UpdateTaskModelType = {
      title: newTaskTitle,
      description: 'new description',
      completed: true,
      status: 1,
      priority: 5,
      startDate: '2021-08-19T13:12:11.577',
      deadline: '2021-08-19T13:12:11.577'
    }
    todolistsApi.updateTask(todolistId, taskId, data)
      .then((res) => {
        setState(res.data)
      })

  }

  return <div>
    <div>
      <input placeholder={'todolistId id'} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <input placeholder={'Task id'} value={taskId} onChange={(e) => {
        setTaskId(e.currentTarget.value)
      }}/>
      <input placeholder={'New todolist title'} value={newTaskTitle} onChange={(e) => {
        setNewTaskTitle(e.currentTarget.value)
      }}/>
      <button onClick={updateTask}>Update task title</button>
    </div>
    {JSON.stringify(state)}
  </div>
}
