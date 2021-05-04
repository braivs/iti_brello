import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

type TodoListPropsType = {
  todoListID: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  addTask: (title: string, todoListId: string) => void
  removeTask: (taskID: string, todoListId: string) => void
  removeTodoList: (todoListId: string) => void
  changeFilter: (value: FilterValuesType, todoListId: string) => void
  changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListId: string) => void
  changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
  changeTodoListTitle: (title: string, todoListId: string) => void
}

function TodoList(props: TodoListPropsType) {
  const {filter} = props
  // const filter = props.filter
  // const [title, setTitle] = useState('')
  // const [error, setError] = useState<boolean>(false)

  const tasksJSXElements = props.tasks.map(t => {
    const removeTask = () => props.removeTask(t.id, props.todoListID)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
    const changeTaskTitle = (title: string) =>
      props.changeTaskTitle(t.id, title, props.todoListID)
    return (
      //условное присвоение класса
      <li className={t.isDone ? 'is-done' : ''}>
        <input
          onChange={changeTaskStatus}
          type="checkbox"
          checked={t.isDone}/>
        {/*<span>{t.title}</span>*/}
        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
        <button onClick={removeTask}>X</button>
      </li>
    )
  })

 /* const onClickAddTask = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle) {
      props.addTask(trimmedTitle, props.todoListID)
    } else {
      setError(true)
    }
    setTitle('')
  }
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddTask()
    }
  }*/
/*  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }*/
  const onClickAllFilter = () => props.changeFilter("all", props.todoListID)
  const onClickActiveFilter = () => props.changeFilter("active", props.todoListID)
  const onClickCompletedFilter = () => props.changeFilter("completed", props.todoListID)
  const onClickRemoveTodoList = () => props.removeTodoList(props.todoListID)
  const addTask = (title: string) => props.addTask(title, props.todoListID)
  const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

  /*const errorMessage = error
    //? <div className={'error-message'}>Title is required!</div>
    // инлайновая стилизация: (встроенная)
    ? <div style={{backgroundColor: 'red', borderRadius: '5px'}}>Title is required!</div> // css подобный объект
    : null*/

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
        <button onClick={onClickRemoveTodoList}>x</button>
      </h3>
      <AddItemForm addItem={addTask} />
      {/*<div>
        <input className = {error ? 'error' : ''}
          value={title}
          onChange={onChangeTitle}
          onKeyPress={onKeyPressAddTask}
        />
        <button onClick={onClickAddTask}>+</button>
        {errorMessage}
      </div>*/}
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