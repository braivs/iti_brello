import {SetAppErrorActionType, SetAppStatusActionType} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {ClearTodosDataActionType} from "../TodolistsList/todolists-reducer";

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// types
type ActionType = ReturnType<typeof setIsLoggedInAC> | ClearTodosDataActionType
type InitialStateType = {
    isLoggedIn: boolean
}

type ThunkDispatch = Dispatch<ActionType | SetAppStatusActionType | SetAppErrorActionType>
