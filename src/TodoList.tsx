import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

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
  changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
  changeTodoListTitle: (title: string, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {
  const {filter} = props

  const tasksJSXElements = props.tasks.map(t => {
    const removeTask = () => props.removeTask(t.id, props.todoListID)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
    }
    const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)

    return (
      <li key={t.id} className={t.isDone ? 'is-done' : ''}>
        <input
          onChange={changeTaskStatus}
          type="checkbox"
          checked={t.isDone}/>
        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
        {/*<span>{t.title}</span>*/}
        <button onClick={removeTask}>X</button>
      </li>
    )
  })

  const addTask = (title: string) => props.addTask(title, props.todoListID)
  const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

  const onClickAllFilter = () => props.changeFilter("all", props.todoListID)
  const onClickActiveFilter = () => props.changeFilter("active", props.todoListID)
  const onClickCompletedFilter = () => props.changeFilter("completed", props.todoListID)


  return (
    <div>
      <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
        <button onClick={() => props.removeTodoList(props.todoListID)}>X</button>
      </h3>
      <AddItemForm addItem={addTask} />
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