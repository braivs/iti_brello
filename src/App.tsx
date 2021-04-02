import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

function App() {

  // BLL:
  const tasksToLearn: Array<TaskType> = [
    {id: 1, title: "HTML & CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false}
  ]

  const tasksToBuy: Array<TaskType> = [
    {id: 4, title: "Milk", isDone: true},
    {id: 5, title: "Water", isDone: true},
    {id: 6, title: "Juice", isDone: false}
  ]

  const tasksBooks: Array<TaskType> = [
    {id: 7, title: "Kastaneda", isDone: false},
    {id: 8, title: "Timoti Lirri", isDone: true},
    {id: 9, title: "Taisha Abilyar", isDone: true}
  ]

  // UI:
  return (
    <div className="App">
      <TodoList title={"What to learn"} tasks={tasksToLearn}/>
      <TodoList title={"What to buy"} tasks={tasksToBuy}/>
      <TodoList title={"What to read"} tasks={tasksBooks}/>

    </div>
  );
}

export default App;
