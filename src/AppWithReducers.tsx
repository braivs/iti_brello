// start wednesday circle 2

import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
  AddTodoListAC,
  ChangeTodoListFilterAC,
  ChangeTodolistTitleAC,
  removeTodoListAC,
  todoListsReducer
} from "./state/todolists-reducer";

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


function AppWithReducers() {

  // BLL:
  const todoListID_1 = v1()
  const todoListID_2 = v1()

  const [todoLists, dispatchToTodolists] = useReducer(todoListsReducer, [
    {id: todoListID_1, title: 'What to learn', filter: 'all'},
    {id: todoListID_2, title: 'What to buy', filter: 'all'}
  ])

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todoListID_1]: [
      {id: v1(), title: 'HTML & CSS', isDone: false},
      {id: v1(), title: 'JS', isDone: false},
      {id: v1(), title: 'React', isDone: true},
    ],
    [todoListID_2]: [
      {id: v1(), title: 'Milk', isDone: false},
      {id: v1(), title: 'Bread', isDone: false},
      {id: v1(), title: 'Potato', isDone: true},
    ]
  })

  function removeTask(taskID: string, todoListID: string) {
    const action = removeTaskAC(taskID, todoListID)
    dispatchToTasks(action)

  }

  function addTask(title: string, todoListID: string) {
    const action = addTaskAC(title, todoListID)
    dispatchToTasks(action)
  }

  function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
    const action = changeTaskStatusAC(taskID, isDone, todoListID)
    dispatchToTasks(action)
  }

  function changeTaskTitle(taskID: string, taskTitle: string, todoListID: string) {
    const action = changeTaskTitleAC(taskID, taskTitle, todoListID)
    dispatchToTasks(action)
  }

  function changeTodoListFilter(filter: FilterValuesType, todoListID: string) {
    const action = ChangeTodoListFilterAC(filter, todoListID)
    dispatchToTodolists(action)
  }

  function removeTodoList(todoListID: string) {
    const action = removeTodoListAC(todoListID)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }

  function changeTodoListTitle(title: string, todoListID: string) {
    const action = ChangeTodolistTitleAC(title, todoListID)
    dispatchToTodolists(action)
  }

  function addTodoList(title: string) {
    const action = AddTodoListAC(title)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }

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
              let allTodolistTasks = tasks[tl.id];
              let tasksForTodolist = allTodolistTasks;

              if (tl.filter === "active") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
              }
              if (tl.filter === "completed") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
              }

              return <Grid item>
                <Paper style={{padding: "10px"}}>
                  <TodoList
                    key={tl.id}
                    todoListID={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
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

export default AppWithReducers;
