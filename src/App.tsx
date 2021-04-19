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

function App() {
  // BLL:
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: "HTML & CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Bootstrap", isDone: false}
  ])
  const [filter, setFilter] = useState<FilterValuesType>("all")

  function removeTask(taskID: string) {
    const filteredTasks = tasks.filter(t => t.id !== taskID)
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false
    }
    setTasks([newTask, ...tasks])
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }

  // UI:
  function getTasksForTodolist(){
    switch (filter) {
      case "active":
        return tasks.filter(t => !t.isDone)
      case "completed":
        return tasks.filter(t => t.isDone)
      default:
        return tasks
    }
  }
  return (
    <div className="App">
      <TodoList
        title={"What to learn"}
        tasks={getTasksForTodolist()}
        filter={filter}
        addTask = {addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
