import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListType} from "./AppWithRedux";

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

  // addon
  // const todo = useSelector<AppRootStateType, TodoListType>(state => state.todolists
  //   .filter(todo => todo.id === props.todoListID)[0])
  // const todoTasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID])

  const {filter} = props

  const tasksJSXElements = props.tasks.map(t => {
    const removeTask = () => props.removeTask(t.id, props.todoListID)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
    }
    const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)

    return (
      <div key={t.id} className={t.isDone ? 'is-done' : ''}>
        <Checkbox
          checked={t.isDone}
          color="primary"
          onChange={changeTaskStatus}
        />
        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
        <IconButton onClick={removeTask}>
          <Delete/>
        </IconButton>
      </div>
    )
  })

  const addTask = (title: string) => props.addTask(title, props.todoListID)
  const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

  const onClickAllFilter = () => props.changeFilter('all', props.todoListID)
  const onClickActiveFilter = () => props.changeFilter('active', props.todoListID)
  const onClickCompletedFilter = () => props.changeFilter('completed', props.todoListID)

  const removeTodoList = () => {
    props.removeTodoList(props.todoListID)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
        <IconButton onClick={removeTodoList}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>
      {tasksJSXElements}
      <div>
        <Button
          variant={filter === 'all' ? 'outlined' : 'text'}
          onClick={onClickAllFilter}
          color={'default'}
        >All</Button>
        <Button
          variant={filter === 'active' ? 'outlined' : 'text'}
          onClick={onClickActiveFilter}
          color={'primary'}
        >Active</Button>
        <Button
          variant={filter === 'completed' ? 'outlined' : 'text'}
          onClick={onClickCompletedFilter}
          color={'secondary'}
        >Completed</Button>
      </div>
    </div>
  )
}

export default TodoList;