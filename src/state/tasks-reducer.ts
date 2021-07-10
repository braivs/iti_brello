import {TasksStateType, TaskType} from '../App';
import {v1} from 'uuid';
import {AddTodoListAT, RemoveTodoListAT, todoListID_1, todoListID_2} from "./todolists-reducer";

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
  todoListID: string
  isDone: boolean
}

type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskID: string
  title: string
  todoListID: string
}

export type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType | AddTodoListAT | RemoveTodoListAT



const initialState: TasksStateType = {
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

}

// const initialState = {}
// type initialStateType = typeof initialState

export const tasksReducer = (state = initialState, action: ActionType) => {
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
    case 'CHANGE-TASK-STATUS': {
      const stateCopy = {...state}
      stateCopy[action.todoListID] = state[action.todoListID]
        .map(t => t.id === action.taskID
          ? {...t, isDone: action.isDone}
          : t)
      return stateCopy
    }
    case 'CHANGE-TASK-TITLE': {
      const stateCopy = {...state}
      stateCopy[action.todoListID] = state[action.todoListID].map(t => t.id === action.taskID ? {...t, title: action.title} : t)
      return stateCopy
    }
    case "ADD-TODOLIST": {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = []
      return stateCopy;
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = {...state}
      delete stateCopy[action.todoListID]
      return stateCopy;
    }

    default:
      return state
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {
    type: 'REMOVE-TASK',
    taskId,
    todolistId
  }
}

export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
  return {
    type: 'ADD-TASK',
    title,
    todoListID
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

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
  return {
    type: 'CHANGE-TASK-TITLE',
    title,
    todoListID,
    taskID
  }
}