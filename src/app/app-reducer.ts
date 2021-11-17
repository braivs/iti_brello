import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) { // PayloadAction<{status: RequestStatusType}>
            state.status = action.payload.status
        },
        setAppInitializedAC(state, action: PayloadAction<{value: boolean}>) {
            state.isInitialized = action.payload.value
        }
    }
})

export const appReducer = slice.reducer
export const {setAppInitializedAC, setAppStatusAC, setAppErrorAC} = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // есть ли ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setAppInitializedAC({value: true}))
        } else {

        }
        dispatch(setAppInitializedAC({value: true}))
    })
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;