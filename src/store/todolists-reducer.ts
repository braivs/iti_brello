import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

type RemoveTodoListAT = {
  type: "REMOVE-TODOLIST"
  todoListId: string
}
type AddTodoListAT = {
  type: 'ADD-TODOLIST'
  title: string
}
type ChangeTodoListTitleAT = {
  type: 'CHANGE-TODOLIST-TITLE'
  title: string
  todoListId: string
}
type ChangeTodoListFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER'
  filter: FilterValuesType
  todoListId: string
}

export type ActionUnionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer =
  (todoLists: Array<TodoListType>, action: ActionUnionType): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todoLists.filter(tl => tl.id !== action.todoListId)
    case 'ADD-TODOLIST':
      const newTodoListID = v1()
      const newTodoList: TodoListType = {id: newTodoListID, title: action.title, filter: 'all'}
      return [...todoLists, newTodoList]
    case 'CHANGE-TODOLIST-TITLE':
      return todoLists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
    default:
      return todoLists
  }
}

export const RemoveTodoListAC = (todoListId: string): RemoveTodoListAT => {
  return {type: 'REMOVE-TODOLIST', todoListId: todoListId}
}