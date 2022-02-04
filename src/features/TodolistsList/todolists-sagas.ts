import {call, put, takeEvery} from "redux-saga/effects";
import {setAppStatusAC} from "../../app/app-reducer";
import {ResponseType, todolistsAPI, TodolistType} from "../../api/todolists-api";
import {
    addTodolistAC,
    changeTodolistEntityStatusAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistsAC
} from "./todolists-reducer";
import {AxiosResponse} from "axios";

export function* fetchFetchTodolistsWorkerSaga(action: ReturnType<typeof fetchFetchTodolists>) {
    yield put(setAppStatusAC('loading'))
    const res: AxiosResponse<TodolistType[]> = yield call(todolistsAPI.getTodolists)
    yield put(setTodolistsAC(res.data))
    yield put(setAppStatusAC('succeeded'))
    /*.catch(error => {
        handleServerNetworkError(error, dispatch)
    })*/
}

export const fetchFetchTodolists = () => ({type: 'TODOLISTS/FETCH-FETCH-TODOLISTS'})

export function* fetchRemoveTodolistWorkerSaga(action: ReturnType<typeof fetchRemoveTodolist>) {
    yield put(setAppStatusAC('loading'))
    yield put(changeTodolistEntityStatusAC('loading', action.id))
    const res: AxiosResponse<ResponseType> = yield call(todolistsAPI.deleteTodolist, action.id)
    yield put(removeTodolistAC(action.id))
    yield put(setAppStatusAC('succeeded'))
    /*.catch((error) => {
        handleServerNetworkError(error, dispatch)
        dispatch(changeTodolistEntityStatusAC('idle', id))
    })*/
}

export const fetchRemoveTodolist = (id: string) => ({type: 'TODOLISTS/FETCH-REMOVE-TODOLIST', id})

export function* fetchAddTodolistWorkerSaga(action: ReturnType<typeof fetchAddTodolist>) {
    yield put(setAppStatusAC('loading'))
    const res: AxiosResponse<ResponseType<{ item: TodolistType }>> = yield call(todolistsAPI.createTodolist, action.title)
    if (res.data.resultCode === 0) {
        yield put(addTodolistAC(res.data.data.item))
        yield put(setAppStatusAC('succeeded'))
    }
    /*} else {
        handleServerAppError(res.data, dispatch)
    }*/
    /*.catch((error) => {
        handleServerNetworkError(error, dispatch)
    })*/
}

export const fetchAddTodolist = (title: string) => ({type: 'TODOLISTS/FETCH-ADD-TODOLIST', title})

export function* fetchChangeTodolistTitleSaga(action: ReturnType<typeof fetchChangeTodolistTitle>) {
    const res: AxiosResponse<ResponseType> = yield call(todolistsAPI.updateTodolist, action.id, action.title)
    if (res.data.resultCode === 0) {
        yield put(changeTodolistTitleAC(action.title, action.id))
    }
    /*else {
        handleServerAppError(res.data, dispatch)
    }*/
    /*.catch((error) => {
        handleServerNetworkError(error, dispatch)
    })*/
}

export const fetchChangeTodolistTitle = (title: string, id: string) => ({
    type: 'TODOLISTS/FETCH-CHANGE-TODOLIST-TITLE',
    title,
    id
})

export function* todolistsWatcherSaga() {
    yield takeEvery('TODOLISTS/FETCH-FETCH-TODOLISTS', fetchFetchTodolistsWorkerSaga)
    yield takeEvery('TODOLISTS/FETCH-REMOVE-TODOLIST', fetchRemoveTodolistWorkerSaga)
    yield takeEvery('TODOLISTS/FETCH-ADD-TODOLIST', fetchAddTodolistWorkerSaga)
    yield takeEvery('TODOLISTS/FETCH-CHANGE-TODOLIST-TITLE', fetchChangeTodolistTitleSaga)
}

//todo: add else and catch