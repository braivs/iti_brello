import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoListAT, RemoveTodoListAT, setTodolistsAC, SetTodolistsAT} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";
import {Dispatch} from "redux";

type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  tasksId: string
  todolistId: string
}

type AddTaskActionType = {
  type: 'ADD-TASK'
  task: TaskType
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

export type SetTasksActionType = {
  type: 'SET-TASKS'
  tasks: Array<TaskType>
  todolistId: string
}

const initialState: TasksStateType = {}

type initialState = typeof initialState

export type ActionType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodoListAT
  | RemoveTodoListAT
  | SetTodolistsAT
  | SetTasksActionType

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {

  switch (action.type) {
    case 'REMOVE-TASK': {
      // short:
      // let copyState = {...state}
      // copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.tasksId)
      // return copyState
      // detailed:
      const stateCopy = {...state};
      const tasks = state[action.todolistId];
      const filteredTasks = tasks.filter(t => t.id !== action.tasksId)
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    }
    case 'ADD-TASK': {
      // short:
      // const newTask: TaskType = { id: v1(), title: action.title, isDone: false }
      // return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
      // detailed:
      const stateCopy = {...state};
      const newTask = action.task
      const tasks = stateCopy[newTask.todoListId];
      const newTasks = [newTask, ...tasks]
      stateCopy[newTask.todoListId] = newTasks;
      return stateCopy;
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map(task => {
          if (task.id === action.taskID) return {...task, status: action.status}
          else return task
        })
      };
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map(task => {
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
    case "SET-TODOLISTS": {
      const copyState = {...state}
      action.todolists.forEach(tl => {
        copyState[tl.id] = [];
      })
      return copyState
    }
    case "SET-TASKS": {
      const copyState = {...state}
      copyState[action.todolistId] = action.tasks

      return copyState
    }
    default:
      return state
  }
}

export const removeTaskAC = (tasksId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', tasksId: tasksId, todolistId}
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return {type: 'ADD-TASK', task}
}

export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', taskID, status, todoListID}
}

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', taskID, title, todoListID}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
  return {type: 'SET-TASKS', tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
      .then((res) => {
        const tasks = res.data.items
        const action = setTasksAC(tasks, todolistId)
        dispatch(action)
      })
  }
}

export const removeTaskTC = (taskId: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
      .then((res) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
      })
  }
}

export const addTaskTC = (title: string, todoListID: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.createTask(todoListID, title)
      .then(res => {
        const task = res.data.data.item
        const action = addTaskAC(task)
        dispatch(action)

      })
  }
}




