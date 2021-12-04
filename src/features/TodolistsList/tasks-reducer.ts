import {
    addTodolistAC,
    AddTodoListActionType,
    ClearTodosDataActionType, removeTodolistAC,
    RemoveTodoListActionType, setTodolistsAC,
    SetTodolistsActionType
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: any): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.tasksId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state, [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskID ? {...t, ...action.model} : t)
            }
        case addTodolistAC.type:
            return {...state, [action.todolist.id]: []}
        case removeTodolistAC.type: {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case setTodolistsAC.type: {
            const copyState = {...state}
            action.todolists.forEach((tl: any) => {
                copyState[tl.id] = [];
            })
            return copyState
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        case "CLEAR-DATA":
            return {}
        default:
            return state
    }
}

// actions
export const removeTaskAC = (tasksId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', tasksId: tasksId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskID: string, model: UpdateDomainTaskModelType, todoListID: string) =>
    ({type: 'UPDATE-TASK', taskID, model, todoListID} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: ThunkDispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            const action = removeTaskAC(taskId, todolistId)
            dispatch(action)
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTaskTC = (title: string, todoListID: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTask(todoListID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
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
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC(taskId, domainModel, todoListId)
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | ClearTodosDataActionType
type ThunkDispatch = Dispatch<ActionType | SetAppStatusActionType | SetAppErrorActionType>
