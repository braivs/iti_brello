import {TasksStateType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, TodoListDomainType, todoListsReducer} from "./todolists-reducer";

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodoListDomainType> = [];

  const action = AddTodoListAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks === idFromTodolists).toBe(true)

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});


