import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

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

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todoLists.filter(tl => tl.id !== action.todoListID)
    case 'ADD-TODOLIST':
      const newTodoListID = action.todolistId
      const newTodoList: TodoListType = {
        id: newTodoListID,
        title: action.title,
        filter: 'all'
      }
      return [...todoLists, newTodoList]
    case 'CHANGE-TODOLIST-FILTER':
      return todoLists.map(tl => tl.id === action.todoListID
        ? {...tl, filter: action.filter}
        : tl)
    case 'CHANGE-TODOLIST-TITLE':
      return todoLists.map(tl => tl.id === action.todoListID
        ? {...tl, title: action.title}
        : tl)
    default:
      return todoLists
  }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
  return {
    type: 'REMOVE-TODOLIST',
    todoListID: todoListID
  }
}

export const addTodoListAC = (title: string): AddTodoListAT => {
  return {
    type: 'ADD-TODOLIST',
    title,
    todolistId: v1()
  }
}

export const changeTodoListFilterAC =
  (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterAT => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: filter,
    todoListID: todoListID
  }}

  export const changeTodolistTitleAC =
    (title: string, todoListID: string): ChangeTodolistTitleAT => {
    return {
      type: 'CHANGE-TODOLIST-TITLE',
      title: title,
      todoListID: todoListID
    }
  }



