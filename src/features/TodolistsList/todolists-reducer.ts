import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {fetchTasksTC} from "./tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodoListDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{id: string}>){
            const index = state.findIndex(tl => tl.id != action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>){
            state.push({...action.payload.todolist, filter: 'all', entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{title: string, id: string}>){
            const index = state.findIndex(tl => tl.id != action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{filter: FilterValuesType, id: string}>){
            const index = state.findIndex(tl => tl.id != action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{status: RequestStatusType, id: string}>){
            const index = state.findIndex(tl => tl.id != action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        setTodolistsAC(state, action: PayloadAction<{todolists: Array<TodolistType>}>){
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        }
    }
})

export const todoListsReducer = slice.reducer;
export const {removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC
    ,changeTodolistEntityStatusAC, setTodolistsAC} = slice.actions


type removeTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

// actions
/*export const removeTodolistAC = (id: string): removeTodolistAT =>
    ({type: 'REMOVE-TODOLIST', id})
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER', filter, id} as const)
export const changeTodolistEntityStatusAC = (status: RequestStatusType, id: string) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', status, id} as const)
export const changeTodolistTitleAC = (title: string, id: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', title, id} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: "SET-TODOLISTS", todolists} as const)*/

export const clearTodosDataAC = () => ({type: 'CLEAR-DATA'} as const)

// thunks
// todo: need to fix any
export const fetchTodolistsTC = () => {
    return (dispatch: any) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC({todolists: res.data}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return res.data
            })
            .then((todos) => {
                todos.forEach((tl) => {
                    dispatch(fetchTasksTC(tl.id))
                })

            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({status: 'loading', id: todolistId}))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC({id: todolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTodolistEntityStatusAC({status: 'idle', id: todolistId}))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC({todolist: res.data.data.item}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const changeTodolistTitleTC = (title: string, id: string,) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC({title, id}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

// types
export type AddTodoListActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type ClearTodosDataActionType = ReturnType<typeof clearTodosDataAC>
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}