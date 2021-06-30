import React, {useReducer} from 'react';
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

  const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
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

    dispatchToTasks(removeTaskAC(taskID, todoListID))
  }

  function addTask(title: string, todoListID: string) {

    dispatchToTasks(addTaskAC(title, todoListID))
  }

  function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {

    dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListID))
  }

  function changeTaskTitle(taskID: string, title: string, todoListID: string) {

    dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
  }

  function changeTodoListFilter(value: FilterValuesType, todoListID: string) {
    let action = changeTodoListFilterAC(value, todoListID)
    dispatchToTodoLists(action)
  }

  function changeTodoListTitle(title: string, todoListID: string) {
    dispatchToTodoLists(changeTodolistTitleAC(title, todoListID))
  }

  function removeTodoList(todoListID: string) {
    let action = removeTodoListAC(todoListID);
    dispatchToTasks(action)
    dispatchToTodoLists(action)
  }

  function addTodoList(title: string) {
    let action = addTodoListAC(title)
    dispatchToTasks(action)
    dispatchToTodoLists(action)
  }

  // UI:
  function getFilteredTasks(tl: TodoListType) {
    switch (tl.filter) {
      case 'active':
        return tasks[tl.id].filter(t => !t.isDone)
      case 'completed':
        return tasks[tl.id].filter(t => t.isDone)
      default:
        return tasks[tl.id]
    }
  }

  const todoListComponents = todoLists.map(tl => {
    const tasksForTodolist = getFilteredTasks(tl)
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

export default AppWithReducers;
