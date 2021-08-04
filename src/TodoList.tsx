import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListType} from "./AppWithRedux";
import {Task} from "./Task";
import {TaskWithDispatch} from "./TaskWithDispatch";

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

const TodoList = React.memo(function (props: TodoListPropsType) {
  console.log('Todolist')

  const {filter} = props

  let allTodolistTasks = props.tasks
  let tasksForTodolist = allTodolistTasks

  if (props.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
  }
  if (props.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
  }


  const tasksJSXElements = tasksForTodolist.map(t => {
    const removeTask = () => props.removeTask(t.id, props.todoListID)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
    }
    // return <Task
    //   key = {t.id}
    //   todolistId = {props.todoListID}
    //   task = {t}
    //   changeTaskStatus = {props.changeTaskStatus}
    //   changeTaskTitle = {props.changeTaskTitle}
    //   removeTask = {props.removeTask}
    //
    // />
    return <TaskWithDispatch key={t.id} todolistId={props.todoListID} task={t} />
  })

  const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [props.addTask, props.todoListID])
  const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todoListID),[])

  const onClickAllFilter = useCallback(() => props.changeFilter('all', props.todoListID),[])
  const onClickActiveFilter = useCallback(() => props.changeFilter('active', props.todoListID),[])
  const onClickCompletedFilter = useCallback(() => props.changeFilter('completed', props.todoListID),[])

  const removeTodoList = () => {
    props.removeTodoList(props.todoListID)
  }


  return <div>
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

})

export default TodoList;