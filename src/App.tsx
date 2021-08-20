// start wednesday circle 2

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

export type TasksStateType = {
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
    // short:
    /*const copyTasks = {...tasks}
    copyTasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
    setTasks(copyTasks);*/

    // detailed:
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todoListID];
    // перезапишем в этом объекте массив для нужного тудулиста отфильтрованным массивом:
    tasks[todoListID] = todolistTasks.filter(t => t.id != taskID);
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasks});


  }
  function addTask(title: string, todoListID: string) {
    // short:
    /*const newTask: TaskType = { id: v1(), title, isDone: false }
    setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})*/

    // detailed:
    let task = {id: v1(), title: title, isDone: false};
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todoListID];
    // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
    tasks[todoListID] = [task, ...todolistTasks];
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasks});
  }
  function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
    // short:
    /*const copyTasks = {...tasks}
    copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
    setTasks(copyTasks);*/

    // detailed:
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todoListID];
    // найдём нужную таску:
    let task = todolistTasks.find(t => t.id === taskID);
    //изменим таску, если она нашлась
    if (task) {
      task.isDone = isDone;
      // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      setTasks({...tasks});
    }
  }
  function changeTaskTitle(taskID: string, title: string, todoListID: string) {
    // short:
    /*const copyTasks = {...tasks}
    copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
    setTasks(copyTasks);*/

    // detailed:
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todoListID];
    // найдём нужную таску:
    let task = todolistTasks.find(t => t.id === taskID);
    //изменим таску, если она нашлась
    if (task) {
      task.title = title;
      // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      setTasks({...tasks});
    }
  }

  function changeTodoListFilter(filter: FilterValuesType, todoListID: string) {
    // short:
    // setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))

    // detailed:
    let todolist = todoLists.find(tl => tl.id === todoListID);
    if (todolist) {
      todolist.filter = filter;
      setTodoLists([...todoLists])
    }
  }
  function removeTodoList(todoListID: string) {
    // short:
    /*setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    const copyTasks = {...tasks}
    delete copyTasks[todoListID]
    setTasks(copyTasks)*/

    // detailed:
    // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
    setTodoLists(todoLists.filter(tl => tl.id != todoListID));
    // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
    delete tasks[todoListID]; // удаляем св-во из объекта... значением которого являлся массив тасок
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasks});
  }

  function changeTodoListTitle(title: string, todoListID: string) {
    // short:
    // setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))

    // найдём нужный todolist
    const todolist = todoLists.find(tl => tl.id === todoListID);
    if (todolist) {
      // если нашёлся - изменим ему заголовок
      todolist.title = title;
      setTodoLists([...todoLists]);
    }
  }

  function addTodoList(title: string) {
    const newTodoListID = v1()
    const newTodoList: TodoListType = {id: newTodoListID, title, filter: 'all'}
    setTodoLists([...todoLists, newTodoList])
    setTasks({
      ...tasks, [newTodoListID]: []
    })
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
