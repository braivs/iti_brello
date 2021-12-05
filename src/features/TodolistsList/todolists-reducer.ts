import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTasksTC} from "./tasks-reducer";

const initialState: Array<TodoListDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{id: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>){
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{title: string, id: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{filter: FilterValuesType, id: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{status: RequestStatusType, id: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        setTodolistsAC(state, action: PayloadAction<{todolists: Array<TodolistType>}>){
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        },
    }
})

export const todoListsReducer = slice.reducer;
export const {removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC
    ,changeTodolistEntityStatusAC, setTodolistsAC} = slice.actions

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
                    //dispatch(fetchTasksTC(tl.id))
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

// todo: Somewhere was a bug fix for not cleaning todolist. But in redux toolkit no.