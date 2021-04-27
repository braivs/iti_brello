import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  // BLL:
  const todoListID_1 = v1()
  const todoListID_2 = v1()
  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListID_1, title: 'What to learn', filter: 'all'},
    {id: todoListID_2, title: 'What to buy', filter: 'all'},
  ])
  const [tasks, setTasks] = useState<TaskStateType>({
    [todoListID_1]: [
      {id: v1(), title: 'HTML & CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'React', isDone: false},
      {id: v1(), title: 'Bootstrap', isDone: false}
    ],
    [todoListID_2]: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'Potato', isDone: true},
      {id: v1(), title: 'Bread', isDone: false},
    ]
  })

  const [filter, setFilter] = useState<FilterValuesType>('all')


  function removeTask(taskID: string, todoListId: string) {
    tasks[todoListId] = tasks[todoListId].filter(t => t.id !== taskID)
    setTasks({...tasks})
    // setTasks({...tasks, tasks[todoListId].filter(t => t.id !== taskID) } ) // аналог в одну строку
  }
  function addTask(title: string, todoListId: string) {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false
    }
    setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
  }
  function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListId: string) {
    tasks[todoListId] = tasks[todoListId].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
    setTasks({...tasks})
  }
  function changeFilter(value: FilterValuesType, todoListId: string) {
    setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter : value} : tl))
  }
  function removeTodoList(todoListId: string) {
    setTodoLists((todoLists.filter(tl => tl.id !== todoListId)))
    delete tasks[todoListId]
  }

  // UI:
  function getTasksForTodolist(todoList: TodoListType) {
    switch (todoList.filter) {
      case 'active':
        return tasks[todoList.id].filter(t => !t.isDone)
      case 'completed':
        return tasks[todoList.id].filter(t => t.isDone)
      default:
        return tasks[todoList.id]
    }
  }
  const todoListComponents = todoLists.map(tl => {
    return(
      <TodoList
        key={tl.id}
        todoListID={tl.id}
        title={tl.title}
        tasks={getTasksForTodolist(tl)}
        filter={tl.filter}
        addTask={addTask}
        removeTask={removeTask}
        removeTodoList={removeTodoList}
        changeFilter={changeFilter}
        changeTaskStatus={changeTaskStatus}
      />
    )
    }

  )

  return (
    <div className="App">
      { todoListComponents }
    </div>
  );
}

export default App;
