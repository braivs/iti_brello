import {FilterValuesType, TasksStateType, TaskType, TodoListType} from '../App';
import {v1} from 'uuid';
import { AddTodoListAT, RemoveTodoListAT } from './todolists-reducer';

type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  tasksId: string
  todolistId: string
}

type AddTaskActionType = {
  type: 'ADD-TASK'
  title: string
  todoListId: string
}

type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskID: string
  isDone: boolean
  todoListID: string
}

type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskID: string
  title: string
  todoListID: string
}


export type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
| AddTodoListAT | RemoveTodoListAT

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      // short:
      /*let copyState = {...state}
      copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.tasksId)
      return copyState*/

      // detailed:
      const stateCopy = {...state};
      const tasks = state[action.todolistId];
      const filteredTasks = tasks.filter(t => t.id !== action.tasksId)
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    }
    case 'ADD-TASK': {
      // short:
      /*const newTask: TaskType = { id: v1(), title: action.title, isDone: false }
      return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}*/

      // detailed:
      const stateCopy = {...state};
      const tasks = stateCopy[action.todoListId];
      const newTask = {id: v1(), title: action.title, isDone: false};
      const newTasks = [newTask, ...tasks]
      stateCopy[action.todoListId] = newTasks;
      return stateCopy;
    }
    case 'CHANGE-TASK-STATUS': {
      // short:
      /*const copyState = {...state}
      copyState[action.todoListID] = state[action.todoListID].map(task => task.id === action.taskID
        ? {...task, isDone: action.isDone}
        : task)
      return copyState*/

      // detailed:
      const stateCopy = {...state};
      let tasks = stateCopy[action.todoListID];
      // найдём нужную таску:
      let task = tasks.find(t => t.id === action.taskID);
      //изменим таску, если она нашлась
      if (task) {
        task.isDone = action.isDone;
      }
      return stateCopy;
    }
    case "CHANGE-TASK-TITLE": {
      // short:
      /*const copyState = {...state}
      copyState[action.todoListID] = state[action.todoListID].map(task => task.id === action.taskID
        ? {...task, title: action.title}
        : task)
      return copyState*/

      // detailed:
      const stateCopy = {...state};
      let tasks = stateCopy[action.todoListID];
      // найдём нужную таску:
      let task = tasks.find(t => t.id === action.taskID);
      //изменим таску, если она нашлась
      if (task) {
        task.title = action.title;
      }
      return stateCopy;
    }
    case 'ADD-TODOLIST': {
      // short:
      // return {...state, [action.todolistId]: []}

      // detailded:
      const stateCopy = {...state};
      stateCopy[action.todolistId] = [];
      return stateCopy
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state}
      delete copyState[action.todoListID]
      return copyState
    }
    default:
      throw new Error("I don`t understand this action type")
  }
}

export const removeTaskAC = (tasksId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', tasksId: tasksId, todolistId}
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
  return {type: 'ADD-TASK', title, todoListId}
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todoListID}
}

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', taskID, title, todoListID}
}





