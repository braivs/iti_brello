// sagas
import {AxiosResponse} from "axios";
import {GetTasksResponse, ResponseType, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {setAppStatusAC} from "../../app/app-reducer";
import {addTaskAC, removeTaskAC, setTasksAC, UpdateDomainTaskModelType, updateTaskAC} from "./tasks-reducer";
import {AppRootStateType} from "../../app/store";

export function* fetchTasksWorkerSaga(action: ReturnType<typeof fetchTasks>) {
    yield put(setAppStatusAC('loading'))
    const res: AxiosResponse<GetTasksResponse> = yield call(todolistsAPI.getTasks, action.todolistsId)

    const tasks = res.data.items
    yield put(setTasksAC(tasks, action.todolistsId))
    yield put(setAppStatusAC('succeeded'))
}

export const fetchTasks = (todolistsId: string) => ({type: 'TASKS/FETCH-TASKS', todolistsId})

export function* removeTaskWorkerSaga(action: ReturnType<typeof fetchRemoveTask>) {
    const res: AxiosResponse<ResponseType> = yield call(todolistsAPI.deleteTask, action.todolistsId, action.taskId)
    yield put(removeTaskAC(action.taskId, action.todolistsId))
    /*.catch((error) => {
        handleServerNetworkError(error, dispatch)
    })*/
}

export const fetchRemoveTask = (taskId: string, todolistsId: string) => ({
    type: 'TASKS/FETCH-REMOVE-TASKS',
    todolistsId,
    taskId
})

export function* addTasksWorkerSaga(action: ReturnType<typeof fetchAddTasks>) {
    yield put(setAppStatusAC('loading'))
    const res: AxiosResponse<ResponseType<{ item: TaskType }>> = yield call(todolistsAPI.createTask, action.todoListID, action.title)

    if (res.data.resultCode === 0) {
        const task = res.data.data.item
        const action = addTaskAC(task)
        yield put(action)
        yield put(setAppStatusAC('succeeded'))
    }
    /*else {
        handleServerAppError(res.data, dispatch)
    }*/
    /*.catch((error) => {
        handleServerNetworkError(error, dispatch)
    })*/
}

export const fetchAddTasks = (title: string, todoListID: string) => ({type: 'TASKS/FETCH-ADD-TASKS', title, todoListID})

export function* updateTaskWorkerSaga(action: ReturnType<typeof fetchUpdateTask>) {
    const state: AppRootStateType = yield select()
    const task = state.tasks[action.todoListId].find(t => t.id === action.taskId)
    if (!task) {
        console.warn('task not found it the state')
        return
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...action.domainModel
    }

    const res: AxiosResponse<ResponseType<{ item: TaskType }>> = yield call(todolistsAPI.updateTask, action.todoListId, action.taskId, apiModel)
    if (res.data.resultCode === 0) {
        yield put(updateTaskAC(action.taskId, action.domainModel, action.todoListId))
        /*} else {
            handleServerAppError(res.data, dispatch)
        }*/
        /*.catch((error) => {
            handleServerNetworkError(error, dispatch)
        })*/
    }
}

export const fetchUpdateTask = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) => ({
    type: 'TASKS/FETCH-UPDATE-TASK',
    taskId,
    domainModel,
    todoListId
})

export function* tasksWatcherSaga() {
    yield takeEvery('TASKS/FETCH-TASKS', fetchTasksWorkerSaga)
    yield takeEvery('TASKS/FETCH-REMOVE-TASKS', removeTaskWorkerSaga)
    yield takeEvery('TASKS/FETCH-ADD-TASKS', addTasksWorkerSaga)
    yield takeEvery('TASKS/FETCH-UPDATE-TASK', updateTaskWorkerSaga)
}

//todo: add else and catch