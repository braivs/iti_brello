import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export type FilterValuesType = "all"|"active"|"completed"

function App() {
  // BLL:
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: "HTML & CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
    {id: 4, title: "Bootstrap", isDone: false}
  ])
  const [filter, setFilter] = useState<FilterValuesType>("all")

  function removeTask(taskID: number) {
    const filteredTasks = tasks.filter(t => t.id !== taskID)
    setTasks(filteredTasks);
  }
  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }
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


  // UI:
  return (
    <div className="App">
      <TodoList title={"What to learn"}
                tasks={getTasksForTodolist()}
                removeTask={removeTask}
                changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
