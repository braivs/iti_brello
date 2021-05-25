import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = "all"|"active"|"completed"

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}


function App() {

  // BLL:
  const todoListID_1 = v1()
  const todoListID_2 = v1()
  const[todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListID_1, title: 'What to learn', filter: 'all'},
    {id: todoListID_2, title: 'What to buy', filter: 'all'}
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListID_1]: [
      {id: v1(), title: "HTML & CSS", isDone: false},
      {id: v1(), title: "JS", isDone: false},
      {id: v1(), title: "React", isDone: true},
    ],
    [todoListID_2]: [
      {id: v1(), title: "Milk", isDone: false},
      {id: v1(), title: "Bread", isDone: false},
      {id: v1(), title: "Potato", isDone: true},
    ]
  })

  /*const [filter, setFilter] = useState<FilterValuesType>("all")
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: "HTML & CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Bootstrap", isDone: false}
  ])*/

  function changeTodoListFilter(filter: FilterValuesType, todoListID: string) {
    setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))
  }

  function removeTask(taskID: string, todoListID: string) {
    const copyTasks = {...tasks}
    copyTasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
    setTasks(copyTasks);
  }
  function addTask(title: string, todoListID: string) {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false
    }
    setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
  }
  function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
    const copyTasks = {...tasks}
    copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
    setTasks(copyTasks);
  }
  function removeTodoList(todoListID: string) {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    const copyTasks = {...tasks}
    delete copyTasks[todoListID]
    setTasks(copyTasks)
  }

  // UI:
  function getFilteredTasks(tl: TodoListType) {
    switch (tl.filter) {
      case "active":
        return tasks[tl.id].filter(t => !t.isDone)
      case "completed":
        return tasks[tl.id].filter(t => t.isDone)
      default:
        return tasks[tl.id]
    }
  }

  const todoListComponents = todoLists.map(tl => {
    const tasksForTodolist = getFilteredTasks(tl)
    return (
      <TodoList
        key={tl.id}
        todoListID={tl.id}
        title={tl.title}
        tasks={tasksForTodolist}
        filter={tl.filter}
        addTask = {addTask}
        removeTask={removeTask}
        removeTodoList={removeTodoList}
        changeFilter={changeTodoListFilter}
        changeTaskStatus={changeTaskStatus}
      />
    )
  })
  return (
    <div className="App">
      {todoListComponents}
    </div>
  );
}

export default App;
