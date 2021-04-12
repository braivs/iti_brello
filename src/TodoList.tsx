import React, {useState, KeyboardEvent, ChangeEvent, MouseEvent} from 'react';
import {FilterValuesType, TaskType} from './App';

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  addTask: (title: string) => void
  removeTask: (taskID: string) => void
  changeFilter: (value: string) => void
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
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onClickChangeFilter = (e: MouseEvent<HTMLButtonElement>) => props.changeFilter(e.currentTarget.name)

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onChangeTitle}
          onKeyPress={onKeyPressAddTask}
        />
        <button onClick={onClickAddTask}>+</button>
      </div>
      <ul>
        { tasks }
      </ul>
      <div>
        <button
          name='all'
          onClick={onClickChangeFilter}
        >All</button>
        <button
          name='active'
          onClick={onClickChangeFilter}>Active</button>
        <button
          name='completed'
          onClick={onClickChangeFilter}>Completed</button>
      </div>
    </div>
  )
}

export default TodoList;