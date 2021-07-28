import {
  ActionType, AddTodoListAC, ChangeTodoListFilterAC, ChangeTodolistTitleAC,
  removeTodoListAC,
  todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';

let todolistId1: string;
let todolistId2: string;

let startState: Array<TodoListType>
let newTodolistTitle: string

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]
  newTodolistTitle = "New Todolist"
})

test('correct todolist should be removed', () => {
  const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

  const endState = todoListsReducer(startState, AddTodoListAC(newTodolistTitle))

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

  let newFilter: FilterValuesType = "completed";

  const action: ActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: newFilter,
    todoListID: todolistId2,
  };

  // const endState = todoListsReducer(startState, action);
  const endState = todoListsReducer(startState,
    ChangeTodoListFilterAC(newFilter, todolistId2));

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
    ChangeTodolistTitleAC(newTodolistTitle, todolistId2));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});



