import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {addTodolistAC, TodoListDomainType, todoListsReducer} from "./todolists-reducer";
import {TodolistType} from "../../api/todolists-api";

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodoListDomainType> = [];

  let todolist: TodolistType = {
    title: 'new todolist',
    id: 'any id',
    addedDate: '',
    order: 0
  }

  const action = addTodolistAC({todolist});

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks === idFromTodolists).toBe(true)

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});


