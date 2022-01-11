import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTasksTC} from "./tasks-reducer";
import {action} from "@storybook/addon-actions";

// todo: fix @ts-ignore
export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async (param, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.getTodolists()
            try {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return {todolists: res.data}
            } catch (error) {
                // @ts-ignore
                handleServerNetworkError(error, dispatch)
                return rejectWithValue(null)
            }
})

export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async (title: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.createTodolist(title)
        try {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return {todolist: res.data.data.item}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch(error) {
            // @ts-ignore
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
})

export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: {id: string, title: string}, {dispatch, rejectWithValue}) => {
    const res = await todolistsAPI.updateTodolist(param.id, param.title)
        try {
            if (res.data.resultCode === 0) {
                return {title: param.title, id: param.id}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch(error) {
            // @ts-ignore
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }

})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (todolistId: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({status: 'loading', id: todolistId}))
    const res = await todolistsAPI.deleteTodolist(todolistId)
        try {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {id: todolistId}
        } catch(error) {
            // @ts-ignore
            handleServerNetworkError(error, dispatch)
            dispatch(changeTodolistEntityStatusAC({status: 'idle', id: todolistId}))
            return rejectWithValue(null)
        }
})




const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{filter: FilterValuesType, id: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{status: RequestStatusType, id: string}>){
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: "idle"})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})

export const todoListsReducer = slice.reducer;
export const {changeTodolistFilterAC
    ,changeTodolistEntityStatusAC} = slice.actions

export const clearTodosDataAC = () => ({type: 'CLEAR-DATA'} as const)

export type ClearTodosDataActionType = ReturnType<typeof clearTodosDataAC>
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

// todo: Somewhere was a bug fix for not cleaning todolist. But in redux toolkit no.