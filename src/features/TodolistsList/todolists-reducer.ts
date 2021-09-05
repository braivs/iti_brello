import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC, SetStatusActionType} from "../../app/app-reducer";

const initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id)
    case 'ADD-TODOLIST':
      return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    case 'CHANGE-TODOLIST-ENTITY-STATUS':
      return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
    case "SET-TODOLISTS":
      return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
    default:
      return state
  }
}

// actions
export const removeTodolistAC = (id: string) =>
  ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) =>
  ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) =>
  ({type: 'CHANGE-TODOLIST-FILTER', filter, id} as const)
export const changeTodolistEntityStatusAC = (status: RequestStatusType, id: string) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', status, id} as const)
export const changeTodolistTitleAC = (title: string, id: string) =>
  ({type: 'CHANGE-TODOLIST-TITLE', title, id} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
  ({type: "SET-TODOLISTS", todolists} as const)

// thunks
export const fetchTodolistsTC = () => {
  return (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
      })
  }
}
export const removeTodolistTC = (id: string) => {
  return (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC('loading', id))
    todolistsAPI.deleteTodolist(id)
      .then((res) => {
        dispatch(removeTodolistAC(id))
        dispatch(setAppStatusAC('succeeded'))
      })
  }
}
export const addTodolistTC = (title: string) => {
  return (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
      .then((res) => {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
      })
  }
}
export const changeTodolistTitleTC = (title: string, id: string,) => {
  return (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.updateTodolist(id, title)
      .then((res) => {
        dispatch(changeTodolistTitleAC(title, id))
      })
  }
}

// types
export type AddTodoListActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ActionType =
  | RemoveTodoListActionType
  | AddTodoListActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | SetTodolistsActionType
  | ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch<ActionType | SetStatusActionType>