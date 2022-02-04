import {authAPI, LoginParamsType, ResponseType} from "../../api/todolists-api";
import {setAppStatusAC} from "../../app/app-reducer";
import {setIsLoggedInAC} from "./auth-reducer";
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosResponse} from "axios";

export function* fetchLoginWorkerSaga(action: ReturnType<typeof fetchLogin>) {
    debugger
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
    })*/ // where to put this in saga?
}
// export const fetchLogin = (data: LoginParamsType) => ({type: 'LOGIN/FETCH-LOGIN', data})
export const fetchLogin = (data: LoginParamsType) => {
    debugger
    return {type: 'LOGIN/FETCH-LOGIN', data}
}


export function* authWatcherSaga() {
    yield takeEvery('LOGIN/FETCH-LOGIN', fetchLoginWorkerSaga)
}

