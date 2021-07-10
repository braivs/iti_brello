import React, {useCallback, useReducer} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodolistTitleAC,
  removeTodoListAC,
  todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
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
  console.log('App is called')

  const todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks )
  const dispatch = useDispatch()

  const removeTask = useCallback((taskID: string, todoListID: string) =>  {

    dispatch(removeTaskAC(taskID, todoListID))
  },[dispatch])

  const addTask = useCallback((title: string, todoListID: string) => {

    dispatch(addTaskAC(title, todoListID))
  },[dispatch])

  const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {

    dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
  },[dispatch])

  const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {

    dispatch(changeTaskTitleAC(taskID, title, todoListID))
  },[dispatch])

  const changeTodoListFilter = useCallback((value: FilterValuesType, todoListID: string) => {
    let action = changeTodoListFilterAC(value, todoListID)
    dispatch(action)
  },[dispatch])

  const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
    dispatch(changeTodolistTitleAC(title, todoListID))
  },[dispatch])

  const removeTodoList = useCallback((todoListID: string) => {
    let action = removeTodoListAC(todoListID);
    dispatch(action)
  },[dispatch])

  const addTodoList = useCallback((title: string) => {
    let action = addTodoListAC(title)
    dispatch(action)
  },[dispatch])

  const todoListComponents = todolists.map(tl => {
    let allTodolistsTasks = tasks[tl.id]
    const tasksForTodolist = allTodolistsTasks

    return <Grid item>
      <Paper style={{padding: '10px'}}>
        <TodoList
          key={tl.id}
          todoListID={tl.id}
          title={tl.title}
          tasks={tasksForTodolist}
          filter={tl.filter}
          addTask={addTask}
          removeTask={removeTask}
          removeTodoList={removeTodoList}
          changeFilter={changeTodoListFilter}
          changeTaskStatus={changeTaskStatus}
          changeTaskTitle={changeTaskTitle}
          changeTodoListTitle={changeTodoListTitle}
        />
      </Paper>
    </Grid>
  })

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar style={{justifyContent: 'space-between'}}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            Brello
          </Typography>
          <Button color="inherit" variant={'outlined'}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
          {todoListComponents}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
