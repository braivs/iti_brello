import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  addTask: (title: string) => void
  removeTask: (taskID: string) => void
  changeFilter: (value: FilterValuesType) => void
}

function TodoList(props: TodoListPropsType) {
  const {filter} = props
  // const filter = props.filter
  const [title, setTitle] = useState('')
  const [error, setError] = useState<boolean>(false)
  const tasksJSXElements = props.tasks.map(t => {
    const removeTask = () => props.removeTask(t.id)
    return (
      //условное присвоение класса
      <li className={t.isDone ? 'is-done' : ''}>
        <input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={removeTask}>X</button>
      </li>
    )
  })

  const onClickAddTask = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle) {
      props.addTask(trimmedTitle)
    } else {
      setError(true)
    }
    setTitle('')
  }
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddTask()
    }
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }
  const onClickAllFilter = () => props.changeFilter("all")
  const onClickActiveFilter = () => props.changeFilter("active")
  const onClickCompletedFilter = () => props.changeFilter("completed")
  const errorMessage = error
    //? <div className={'error-message'}>Title is required!</div>
    // инлайновая стилизация: (встроенная)
    ? <div style={{backgroundColor: 'red', borderRadius: '5px'}}>Title is required!</div> // css подобный объект
    : null

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input className = {error ? 'error' : ''}
          value={title}
          onChange={onChangeTitle}
          onKeyPress={onKeyPressAddTask}
        />
        <button onClick={onClickAddTask}>+</button>
        {errorMessage}
      </div>
      <ul>
        { tasksJSXElements }
      </ul>
      <div>
        <button
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={onClickAllFilter}
        >All</button>
        <button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={onClickActiveFilter}>Active</button>
        <button
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={onClickCompletedFilter}>Completed</button>
      </div>
    </div>
  )
}

export default TodoList;