import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from './TodoList';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTaskTC, removeTaskTC, updateTaskTC} from "./state/tasks-reducer";
import {
  addTodolistTC,
  changeTodoListFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodoListDomainType
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";

export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function AppWithRedux() {
  let todoLists = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todolists)
  let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const dispatch = useDispatch()

  useEffect(() => {
    const thunk = fetchTodolistsTC();
    dispatch(thunk)
  }, [])

  const removeTask = useCallback((taskID: string, todoListID: string) => {
    const thunk = removeTaskTC(taskID, todoListID)
    dispatch(thunk)
  }, [])

  const addTask = useCallback((title: string, todoListID: string) => {
    const thunk = addTaskTC(title, todoListID)
    dispatch(thunk)
  }, [])

  const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
    const thunk = updateTaskTC(taskID, {status}, todoListID)
    dispatch(thunk)
  }, [])

  const changeTaskTitle = useCallback((taskID: string, taskTitle: string, todoListID: string) => {
    const thunk = updateTaskTC(taskID, {title: taskTitle}, todoListID)
    dispatch(thunk)
  }, [])

  const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
    const action = changeTodoListFilterAC(filter, todoListID)
    dispatch(action)
  }, [])

  const removeTodoList = useCallback((todoListID: string) => {
    const thunk = removeTodolistTC(todoListID)
    dispatch(thunk)
  }, [])

  const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
    const thunk = changeTodolistTitleTC(title, todoListID)
    dispatch(thunk)
  }, [])

  const addTodoList = useCallback((title: string) => {
    const thunk = addTodolistTC(title)
    dispatch(thunk)
  }, [dispatch])

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "20px"}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todoLists.map(tl => {

              return <Grid item key={tl.id}>
                <Paper style={{padding: "10px"}}>
                  <TodoList
                    key={tl.id}
                    todoListID={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
                    removeTask={removeTask}
                    changeFilter={changeTodoListFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  )
}

export default AppWithRedux;
