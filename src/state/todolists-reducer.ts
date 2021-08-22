import {v1} from 'uuid';
import {TodoListType} from "../api/todolists-api";

export type RemoveTodoListAT = {
  type: 'REMOVE-TODOLIST'
  todoListID: string
}

export type AddTodoListAT = {
  type: 'ADD-TODOLIST'
  title: string
  todolistId: string
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

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodolistTitleAT

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

      // detailer:
      const newTodoListID = action.todolistId
      const newTodoList: TodoListDomainType = {
        id: newTodoListID,
        title: action.title,
        filter: 'all',
        addedDate: '',
        order: 0
      }
      return [...state, newTodoList]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      // short:
      /*return state.map(tl => tl.id === action.todoListID ?
        {...tl, filter: action.filter} : tl)*/

      // detailed:
      const todolist = state.find(tl => tl.id === action.todoListID);
      if (todolist) {
        // если нашёлся - изменим ему фильтр
        todolist.filter = action.filter;
      }
      return [...state];
    }
    case 'CHANGE-TODOLIST-TITLE': {
      // short:
      /*return state.map(tl => tl.id === action.todoListID ?
        {...tl, title: action.title} : tl)*/

      // detailed:
      const todolist = state.find(tl => tl.id === action.todoListID);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = action.title;
      }
      return [...state]
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

export const AddTodoListAC = (title: string): AddTodoListAT => {
  return {
    type: 'ADD-TODOLIST',
    title: title,
    todolistId: v1()
  }
}

export const ChangeTodoListFilterAC =
  (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterAT => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: filter,
    todoListID: todoListID
  }}

  export const ChangeTodolistTitleAC =
    (title: string, todoListID: string): ChangeTodolistTitleAT => {
    return {
      type: 'CHANGE-TODOLIST-TITLE',
      title: title,
      todoListID: todoListID
    }
  }



