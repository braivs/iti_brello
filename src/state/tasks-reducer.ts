import {TasksStateType} from '../App';
import {AddTodoListAT, RemoveTodoListAT, SetTodolistsAT} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  tasksId: string
  todolistId: string
}

type AddTaskActionType = {
  type: 'ADD-TASK'
  task: TaskType
}

type UpdateTaskActionType = {
  type: 'UPDATE-TASK'
  taskID: string
  model: UpdateDomainTaskModelType
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
  | UpdateTaskActionType
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
    case 'UPDATE-TASK': {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map(task => {
          if (task.id === action.taskID) return {...task, ...action.model}
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
      const stateCopy = {...state};
      stateCopy[action.todolist.id] = [];
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

export const updateTaskAC = (taskID: string, model: UpdateDomainTaskModelType, todoListID: string): UpdateTaskActionType => {
  return {type: 'UPDATE-TASK', taskID, model, todoListID}
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

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todoListId].find(t => t.id === taskId)
    if (!task) {
      //throw new Error('task not found it the state')
      console.warn('task not found it the state')
      return
    }
    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel
    }

    todolistsAPI.updateTask(todoListId, taskId, apiModel)
      .then(res => {
        const action = updateTaskAC(taskId, domainModel, todoListId)
        dispatch(action)
      })
  }
}




