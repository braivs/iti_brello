import {
    addTodolistTC,
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType, removeTodolistTC,
    TodoListDomainType,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../../app/app-reducer";
import {TodolistType} from "../../api/todolists-api";

let todolistId1: string;
let todolistId2: string;

let startState: Array<TodoListDomainType>
let newTodolistTitle: string

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: 'idle', addedDate: '', order: 0}
    ]
    newTodolistTitle = "New Todolist"
})

test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, removeTodolistTC.fulfilled({id: todolistId1}, 'requestId', todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolist: TodolistType = {
        title: 'New Todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    }

    const action = addTodolistTC.fulfilled({todolist}, 'requestId', todolist.title)

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todolist.title);
    expect(endState[0].filter).toBe('all')

});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC({id: todolistId2, filter: newFilter})

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    const action = changeTodolistTitleTC({id: todolistId2, title: newTodolistTitle})

    let payload = {title: newTodolistTitle, id: todolistId2};
    const endState = todoListsReducer(startState,
        changeTodolistTitleTC.fulfilled(payload, 'requestId', payload));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('todolists should be set to the state', () => {
    let payload = {todolists: startState};
    const action = fetchTodolistsTC.fulfilled(payload, 'requestId')

    const endState = todoListsReducer([], action);

    expect(endState.length).toBe(2);
});

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = "loading";

    const action = changeTodolistEntityStatusAC({status: newStatus, id: todolistId2})

    const endState = todoListsReducer(startState, action)

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newStatus);
});



