import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
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
  const tasksJSXElements = props.tasks.map(t => {
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
  const onClickAllFilter = () => props.changeFilter("all")
  const onClickActiveFilter = () => props.changeFilter("active")
  const onClickCompletedFilter = () => props.changeFilter("completed")

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
        { tasksJSXElements }
      </ul>
      <div>
        <button
          onClick={onClickAllFilter}
        >All</button>
        <button
          onClick={onClickActiveFilter}>Active</button>
        <button
          onClick={onClickCompletedFilter}>Completed</button>
      </div>
    </div>
  )
}

export default TodoList;