import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';

type TodoListPropsType = {
  todoListID: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  addTask: (title: string, todoListID: string) => void
  removeTask: (taskID: string, todoListID: string) => void
  removeTodoList: (todoListID: string) => void
  changeFilter: (FilterValues: FilterValuesType, todoListID: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {
  const {filter} = props
  // const filter = props.filter
  const [title, setTitle] = useState('')
  const [error, setError] = useState<boolean>(false)
  const tasksJSXElements = props.tasks.map(t => {
    const removeTask = () => props.removeTask(t.id, props.todoListID)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
    }
    return (
      //условное присвоение класса
      <li className={t.isDone ? 'is-done' : ''}>
        <input
          onChange={changeTaskStatus}
          type="checkbox"
          checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={removeTask}>X</button>
      </li>
    )
  })

  const onClickAddTask = () => {
    const validatedTitle = title.trim()
    if (validatedTitle) {
      props.addTask(validatedTitle, props.todoListID)
    } else {
      setError(true)
    }
    setTitle('')
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddTask()
    }
  }
  const onClickAllFilter = () => props.changeFilter("all", props.todoListID)
  const onClickActiveFilter = () => props.changeFilter("active", props.todoListID)
  const onClickCompletedFilter = () => props.changeFilter("completed", props.todoListID)
  const errorMessage = error
    //? <div className={'error-message'}>Title is required!</div>
    // инлайновая стилизация: (встроенная)
    ? <div style={{backgroundColor: 'red', borderRadius: '5px'}}>Title is required!</div> // css подобный объект
    : null

  return (
    <div>
      <h3>{props.title}<button onClick={() => props.removeTodoList(props.todoListID)}>X</button></h3>
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