import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

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

type TasksStateType = {
  [key: string]: Array<TaskType>
}


function App() {

  // BLL:
  const todoListID_1 = v1()
  const todoListID_2 = v1()

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListID_1, title: 'What to learn', filter: 'all'},
    {id: todoListID_2, title: 'What to buy', filter: 'all'}
  ])
  const [tasks, setTasks] = useState<TasksStateType>({
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
    const copyTasks = {...tasks}
    copyTasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
    setTasks(copyTasks);
  }
  function addTask(title: string, todoListID: string) {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false
    }
    setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
  }
  function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
    const copyTasks = {...tasks}
    copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
    setTasks(copyTasks);
  }
  function changeTaskTitle(taskID: string, title: string, todoListID: string) {
    const copyTasks = {...tasks}
    copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
    setTasks(copyTasks);
  }

  function changeTodoListFilter(filter: FilterValuesType, todoListID: string) {
    setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))
  }
  function changeTodoListTitle(title: string, todoListID: string) {
    setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))
  }
  function removeTodoList(todoListID: string) {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    const copyTasks = {...tasks}
    delete copyTasks[todoListID]
    setTasks(copyTasks)
  }
  function addTodoList(title: string) {
    const newTodoListID = v1()
    const newTodoList: TodoListType = {
      id: newTodoListID,
      title,
      filter: 'all'
    }
    setTodoLists([...todoLists, newTodoList])
    setTasks({...tasks, [newTodoListID]: []})
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

export default App;
