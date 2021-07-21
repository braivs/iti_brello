import {FilterValuesType, TasksStateType, TaskType, TodoListType} from '../App';
import {v1} from 'uuid';

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

export type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      let copyState = {...state}
      copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.tasksId)
      return copyState
    }
    case 'ADD-TASK':
      const newTask: TaskType = {
        id: v1(),
        title: action.title,
        isDone: false
      }
      return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
    case 'CHANGE-TASK-STATUS': {
      const copyState = {...state}
      copyState[action.todoListID] = state[action.todoListID].map(task => task.id === action.taskID
        ? {...task, isDone: action.isDone}
        : task)
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




