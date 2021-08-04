import React, {useCallback} from 'react';
import './App.css';
import TodoList from './TodoList';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodolistTitleAC,
  removeTodoListAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function AppWithRedux() {

  let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
  let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

  const dispatch = useDispatch()

  const removeTask = useCallback((taskID: string, todoListID: string) => {
    const action = removeTaskAC(taskID, todoListID)
    dispatch(action)
  },[])

  const addTask = useCallback((title: string, todoListID: string) => {
    const action = addTaskAC(title, todoListID)
    dispatch(action)
  },[])

  const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
    const action = changeTaskStatusAC(taskID, isDone, todoListID)
    dispatch(action)
  }, [])

  const changeTaskTitle = useCallback((taskID: string, taskTitle: string, todoListID: string) => {
    const action = changeTaskTitleAC(taskID, taskTitle, todoListID)
    dispatch(action)
  }, [])

  const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
    const action = ChangeTodoListFilterAC(filter, todoListID)
    dispatch(action)
  }, [])

  const removeTodoList = useCallback((todoListID: string) => {
    const action = removeTodoListAC(todoListID)
    dispatch(action)
  }, [])

  const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
    const action = ChangeTodolistTitleAC(title, todoListID)
    dispatch(action)
  }, [])

  const addTodoList = useCallback((title: string) => {
    const action = AddTodoListAC(title)
    dispatch(action)
  }, [])

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
