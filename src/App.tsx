import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolists-api'
import {FilterValuesType, TodoListDomainType} from "./state/todolists-reducer";


export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  // BLL:
  const todoListID_1 = v1()
  const todoListID_2 = v1()

  const [todoLists, setTodoLists] = useState<Array<TodoListDomainType>>([
    {
      id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '',
      order: 0
    },
    {
      id: todoListID_2, title: 'What to buy', filter: 'all', addedDate: '',
      order: 0
    }
  ])
  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListID_1]: [
      {
        id: v1(), title: 'HTML & CSS', status: TaskStatuses.New, todoListId: todoListID_1, description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      },
      {
        id: v1(), title: 'JS', status: TaskStatuses.New, todoListId: todoListID_1, description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      },
      {
        id: v1(), title: 'React', status: TaskStatuses.Completed, todoListId: todoListID_1, description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      },
    ],
    [todoListID_2]: [
      {
        id: v1(), title: 'Milk', status: TaskStatuses.New, todoListId: todoListID_2, description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      },
      {
        id: v1(), title: 'Bread', status: TaskStatuses.New, todoListId: todoListID_2, description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      },
      {
        id: v1(), title: 'Potato', status: TaskStatuses.Completed, todoListId: todoListID_2, description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      },
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
    let task = {
      id: v1(), title: title, status: TaskStatuses.New, todoListId: todoListID, description: '',
      startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
    };
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todoListID];
    // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
    tasks[todoListID] = [task, ...todolistTasks];
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasks});
  }

  function changeTaskStatus(taskID: string, status: TaskStatuses, todoListID: string) {
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
      task.status = status;
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
    const newTodoList: TodoListDomainType = {
      id: newTodoListID, title, filter: 'all', addedDate: '',
      order: 0
    }
    setTodoLists([...todoLists, newTodoList])
    setTasks({
      ...tasks, [newTodoListID]: []
    })
  }

  function getFilteredTasks(tl: TodoListDomainType) {
    switch (tl.filter) {
      case 'active':
        return tasks[tl.id].filter(t => t.status === TaskStatuses.New)
      case 'completed':
        return tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
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
