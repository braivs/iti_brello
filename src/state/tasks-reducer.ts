import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoListAT, RemoveTodoListAT} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

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
  status: TaskStatuses
  todoListID: string
}

type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskID: string
  title: string
  todoListID: string
}

const initialState: TasksStateType = {}

type initialState = typeof initialState

export type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
| AddTodoListAT | RemoveTodoListAT

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {

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
      const newTask: TaskType = {
        id: v1(),
        title: action.title,
        status: TaskStatuses.New,
        todoListId: action.todoListId, description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        };
      const newTasks = [newTask, ...tasks]
      stateCopy[action.todoListId] = newTasks;
      return stateCopy;
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.todoListID] : state[action.todoListID].map(task => {
          if (task.id === action.taskID) return {...task, status: action.status}
          else return task
        })
      };
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.todoListID] : state[action.todoListID].map(task => {
          if (task.id === action.taskID) return {...task, title: action.title}
          else return task
        })
      };
    }
    case 'ADD-TODOLIST': {
      // short:
      // return {...state, [action.todolistId]: []}

      // detailed:
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
      return state
  }
}

export const removeTaskAC = (tasksId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', tasksId: tasksId, todolistId}
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
  return {type: 'ADD-TASK', title, todoListId}
}

export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', taskID, status, todoListID}
}

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', taskID, title, todoListID}
}





