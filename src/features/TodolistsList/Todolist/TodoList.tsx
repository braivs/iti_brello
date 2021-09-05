import React, {useCallback, useEffect} from 'react';
import AddItemForm from '../../../components/AddItemForm/AddItemForm';
import EditableSpan from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType, TodoListDomainType} from "../todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../tasks-reducer";
import {Task} from "./Task/Task";

type PropsType = {
  todolist: TodoListDomainType
  tasks: Array<TaskType>
  addTask: (title: string, todoListID: string) => void
  removeTask: (taskID: string, todoListID: string) => void
  removeTodoList: (todoListID: string) => void
  changeFilter: (FilterValues: FilterValuesType, todoListID: string) => void
  changeTaskStatus: (taskID: string, status: TaskStatuses, todoListID: string) => void
  changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
  changeTodoListTitle: (title: string, todoListID: string) => void
  demo?: boolean
}

const TodoList = React.memo(function ({demo = false, ...props}: PropsType) {
  console.log('Todolist')

  const dispatch = useDispatch()

  useEffect(() => {
    if (demo) {
      return;
    }
    const thunk = fetchTasksTC(props.todolist.id);
    dispatch(thunk)
  },[])

  let allTodolistTasks = props.tasks
  let tasksForTodolist = allTodolistTasks

  if (props.todolist.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
  }
  if (props.todolist.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
  }


  const tasksJSXElements = tasksForTodolist.map(t => {
    return <Task
      key = {t.id}
      todolistId = {props.todolist.id}
      task = {t}
      changeTaskStatus = {props.changeTaskStatus}
      changeTaskTitle = {props.changeTaskTitle}
      removeTask = {props.removeTask}
    />
  })

  const addTask = useCallback((title: string) => props.addTask(title, props.todolist.id), [props.addTask, props.todolist.id])
  const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todolist.id),[])

  const onClickAllFilter = useCallback(() => props.changeFilter('all', props.todolist.id),[])
  const onClickActiveFilter = useCallback(() => props.changeFilter('active', props.todolist.id),[])
  const onClickCompletedFilter = useCallback(() => props.changeFilter('completed', props.todolist.id),[])

  const removeTodoList = () => {
    props.removeTodoList(props.todolist.id)
  }


  return <div>
    <h3>
      <EditableSpan title={props.todolist.title} changeTitle={changeTodoListTitle}/>
      <IconButton onClick={removeTodoList} disabled={props.todolist.entityStatus === 'loading'}>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>

    {tasksJSXElements}
    <div>
      <Button
        variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
        onClick={onClickAllFilter}
        color={'default'}
      >All</Button>
      <Button
        variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
        onClick={onClickActiveFilter}
        color={'primary'}
      >Active</Button>
      <Button
        variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
        onClick={onClickCompletedFilter}
        color={'secondary'}
      >Completed</Button>
    </div>
  </div>

})

export default TodoList;