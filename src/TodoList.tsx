import React, {useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from './App';

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  addTask: (title: string) => void
  removeTask: (taskID: string) => void
  changeFilter: (value: FilterValuesType) => void
}

function TodoList(props: TodoListPropsType) {
  const [title, setTitle] = useState('')
  const tasks = props.tasks.map(t => {
    const removeTask = () => props.removeTask(t.id)
    return (
      <li>
        <input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={removeTask}>X</button>
      </li>
    )
  })

  const onClickAddTask = () => {
    props.addTask(title)
    setTitle('')
  }
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddTask()
    }
  }
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          onKeyPress={onKeyPressAddTask}
        />
        <button onClick={onClickAddTask}>+</button>
      </div>
      <ul>
        { tasks }
      </ul>
      <div>
        <button onClick={() => props.changeFilter("all")}>All</button>
        <button onClick={() => props.changeFilter("active")}>Active</button>
        <button onClick={() => props.changeFilter("completed")}>Completed</button>
      </div>
    </div>
  )
}

export default TodoList;