import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
  addTodolistTC,
  changeTodoListFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodoListDomainType
} from "./todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@material-ui/core";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import TodoList from "./Todolist/TodoList";
import {TasksStateType} from "../../app/App";

export const TodolistsList = () => {
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
    <>
      <Grid container style={{padding: "20px"}}>
        <AddItemForm addItem={addTodoList}/>
      </Grid>
      <Grid container spacing={3}>
        {
          todoLists.map(tl => {
            return (
              <Grid item key={tl.id}>
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
            )
          })
        }
      </Grid>
    </>
  )
}