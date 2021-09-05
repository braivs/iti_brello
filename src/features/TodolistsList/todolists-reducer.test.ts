import {
  ActionType,
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesType,
  removeTodolistAC,
  setTodolistsAC,
  TodoListDomainType,
  todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from "../../api/todolists-api";
import {RequestStatusType} from "../../app/app-reducer";

let todolistId1: string;
let todolistId2: string;

let startState: Array<TodoListDomainType>
let newTodolistTitle: string

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
    {id: todolistId2, title: "What to buy", filter: "all", entityStatus: 'idle', addedDate: '', order: 0}
  ]
  newTodolistTitle = "New Todolist"
})

test('correct todolist should be removed', () => {
  const endState = todoListsReducer(startState, removeTodolistAC(todolistId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  let todolist: TodolistType = {
    title: 'What to buy',
    id: 'any id',
    addedDate: '',
    order: 0
  }
  const endState = todoListsReducer(startState, addTodolistAC(todolist))

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(todolist.title);
});


test('correct filter of todolist should be changed', () => {

  let newFilter: FilterValuesType = "completed";

  const action: ActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: newFilter,
    id: todolistId2,
  };

  const endState = todoListsReducer(startState,
    changeTodolistFilterAC(newFilter, todolistId2));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});

test('correct todolist should change its name', () => {

  const action = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: todolistId2,
    title: newTodolistTitle
  };

  const endState = todoListsReducer(startState,
    changeTodolistTitleAC(newTodolistTitle, todolistId2));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('todolists should be set to the state', () => {
  const action = setTodolistsAC(startState)

  const endState = todoListsReducer([], action);

  expect(endState.length).toBe(2);
});

test('correct entity status of todolist should be changed', () => {
  let newStatus: RequestStatusType = "loading";

  const action = changeTodolistEntityStatusAC(newStatus, todolistId2)

  const endState = todoListsReducer(startState, action)

  expect(endState[0].entityStatus).toBe('idle');
  expect(endState[1].entityStatus).toBe(newStatus);
});



