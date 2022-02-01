// sagas
import {AxiosResponse} from "axios";
import {GetTasksResponse, ResponseType, todolistsAPI} from "../../api/todolists-api";
import {call, put, takeEvery} from "redux-saga/effects";
import {setAppStatusAC} from "../../app/app-reducer";
import {removeTaskAC, setTasksAC} from "./tasks-reducer";

export function* fetchTasksWorkerSaga(action: ReturnType<typeof fetchTasks>) {
    yield put(setAppStatusAC('loading'))
    const res: AxiosResponse<GetTasksResponse> = yield call(todolistsAPI.getTasks, action.todolistsId)

    const tasks = res.data.items
    yield put(setTasksAC(tasks, action.todolistsId))
    yield put(setAppStatusAC('succeeded'))
}

export const fetchTasks = (todolistsId: string) => ({type: 'TASKS/FETCH-TASKS', todolistsId})

export function* removeTaskWorkerSaga(action: ReturnType<typeof removeTask>) {
    const res: AxiosResponse<ResponseType> = yield call(todolistsAPI.deleteTask, action.todolistsId, action.taskId)
    yield put(removeTaskAC(action.taskId, action.todolistsId))
}

export const removeTask = (todolistsId: string, taskId: string) => ({type: 'TASKS/REMOVE-TASKS', todolistsId, taskId})

export function* tasksWatcherSaga() {
    yield takeEvery('TASKS/FETCH-TASKS', fetchTasksWorkerSaga)
    yield takeEvery('TASKS/REMOVE-TASKS', removeTaskWorkerSaga)
}