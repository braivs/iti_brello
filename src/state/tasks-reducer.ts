import {FilterValuesType, TasksStateType, TaskType, TodoListType} from '../App';
import {v1} from 'uuid';

type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  taskId: string
  todolistId: string
}

type AddTaskActionType = {
  type: 'ADD-TASK'
  title: string
  todoListID: string
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
    case 'REMOVE-TASK':
      let todolistTasks = state[action.todolistId]
      todolistTasks = todolistTasks.filter(task => task.id !== action.taskId)
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
    case 'ADD-TASK':
      const newTask: TaskType = {
        id: v1(),
        title: action.title,
        isDone: false
      }
      return {
        ...state,
        [action.todoListID]: [newTask, ...state[action.todoListID]]
      }
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {...t, isDone: action.isDone} : t)
      }
    default:
      throw new Error('I don`t understand this type')
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {
    type: 'REMOVE-TASK',
    taskId: taskId,
    todolistId
  }
}

export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
  return {
    type: 'ADD-TASK',
    title: title,
    todoListID: todoListID
  }
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusActionType => {
  return {
    type: 'CHANGE-TASK-STATUS',
    taskID: taskID,
    isDone: isDone,
    todoListID: todoListID
  }
}

export const changeTaskTitleAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusActionType => {
  return {
    type: 'CHANGE-TASK-STATUS',
    taskID: taskID,
    isDone: isDone,
    todoListID: todoListID
  }
}