import {v1} from 'uuid';
import {todolistsAPI, TodoListType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type RemoveTodoListAT = {
  type: 'REMOVE-TODOLIST'
  todoListID: string
}

export type AddTodoListAT = {
  type: 'ADD-TODOLIST'
  todolist: TodoListType
}

type ChangeTodoListFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER'
  filter: FilterValuesType
  todoListID: string
}

type ChangeTodolistTitleAT = {
  type: 'CHANGE-TODOLIST-TITLE'
  title: string
  todoListID: string
}

export type SetTodolistsAT = {
  type: 'SET-TODOLISTS'
  todolists: Array<TodoListType>
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodolistTitleAT |
  SetTodolistsAT

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType
}

const initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.todoListID)
    }
    case 'ADD-TODOLIST': {
      // short:
      // return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
      const newTodoList: TodoListDomainType = {...action.todolist, filter: 'all'}
      return [newTodoList, ...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      // short:
      // return state.map(tl => tl.id === action.todoListID ?
      //   {...tl, filter: action.filter} : tl)
      const todolist = state.find(tl => tl.id === action.todoListID);
      if (todolist) {
        // если нашёлся - изменим ему фильтр
        todolist.filter = action.filter;
      }
      return [...state];
    }
    case 'CHANGE-TODOLIST-TITLE': {
      // short:
      // return state.map(tl => tl.id === action.todoListID ?
      //   {...tl, title: action.title} : tl)
      const todolist = state.find(tl => tl.id === action.todoListID);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = action.title;
      }
      return [...state]
    }
    case "SET-TODOLISTS": {
      return action.todolists.map(tl => {
        return {
          ...tl,
          filter: 'all'
        }
      })
    }

    default:
      return state
  }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
  return {
    type: 'REMOVE-TODOLIST',
    todoListID: todoListID
  }
}

export const AddTodoListAC = (todolist: TodoListType): AddTodoListAT => {
  return {
    type: 'ADD-TODOLIST',
    todolist
  }
}

export const changeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterAT => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: filter,
    todoListID: todoListID
  }}

  export const ChangeTodolistTitleAC = (title: string, todoListID: string): ChangeTodolistTitleAT => {
    return {
      type: 'CHANGE-TODOLIST-TITLE',
      title: title,
      todoListID: todoListID
    }
  }

export const setTodolistsAC = (todolists: Array<TodoListType>): SetTodolistsAT => {
  return {
    type: "SET-TODOLISTS",
    todolists: todolists
  }}

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC(res.data))
      })
  }
}

export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
      .then((res) => {
        dispatch(removeTodoListAC(todolistId))
      })
  }
}

export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
      .then((res) => {
        dispatch(AddTodoListAC(res.data.data.item))
      })
  }
}

export const changeTodolistTitleTC = (title: string, todoListID: string, ) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todoListID, title)
      .then((res) => {
        dispatch(ChangeTodolistTitleAC(title, todoListID))
      })
  }
}



