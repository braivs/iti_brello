import {AppRootStateType} from "../app/store";
import {Provider} from "react-redux";
import React from "react";
import {v1} from "uuid";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todoListsReducer} from "../features/TodolistsList/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {appReducer} from "../app/app-reducer";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListsReducer,
  app: appReducer,
  auth: authReducer
})

const initialGlobalState: AppRootStateType = {
  todolists: [
    {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
    {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: 'loading', addedDate: '', order: 0}
  ],
  tasks: {
    ["todolistId1"]: [
      {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
      {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
    ],
    ["todolistId2"]: [
      {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
      {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
    ]
  },
  app: {
    error: null,
    status: 'idle',
    isInitialized: false
  },
  auth: {
    isLoggedIn: false
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => <Provider store={storyBookStore}>{storyFn()}</Provider>