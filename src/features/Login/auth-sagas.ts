import {authAPI, LoginParamsType, ResponseType} from "../../api/todolists-api";
import {setAppStatusAC} from "../../app/app-reducer";
import {setIsLoggedInAC} from "./auth-reducer";
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosResponse} from "axios";
import {clearTodosDataAC} from "../TodolistsList/todolists-reducer";

export function* fetchLoginWorkerSaga(action: ReturnType<typeof fetchLogin>) {
    yield put(setAppStatusAC('loading'))
    const res: AxiosResponse<ResponseType> = yield call(authAPI.login, action.data)
    if (res.data.resultCode === 0) {
        yield put(setIsLoggedInAC(true))
        yield put(setAppStatusAC('succeeded'))
    }
    else {
        // handleServerAppError(res.data, dispatch) // what write instead of dispatch?
    }
    /*.catch((error) => {
        handleServerNetworkError(error, dispatch)
    })*/ // how to pass this in saga?
}
export const fetchLogin = (data: LoginParamsType) => ({type: 'AUTH/FETCH-LOGIN', data})

export function* fetchLogoutWorkerSaga(action: ReturnType<typeof fetchLogout>) {
    yield put(setAppStatusAC('loading'))
    const res: AxiosResponse<ResponseType> = yield call(authAPI.logout)

    if (res.data.resultCode === 0) {
        yield put(setIsLoggedInAC(false))
        yield put(setAppStatusAC('succeeded'))
        yield put(clearTodosDataAC())
    } else {
        // handleServerAppError(res.data, dispatch)
    }
    /*.catch((error) => {
        handleServerNetworkError(error, dispatch)
    })*/
}
export const fetchLogout = () => ({type: 'AUTH/FETCH-LOGOUT'})

export function* authWatcherSaga() {
    yield takeEvery('AUTH/FETCH-LOGIN', fetchLoginWorkerSaga)
    yield takeEvery('AUTH/FETCH-LOGOUT', fetchLogoutWorkerSaga)
}

//todo: add else, and catch
