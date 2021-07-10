import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListType} from "./AppWithRedux";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";

type TodoListPropsType = {
  todoListID: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  addTask: (title: string, todoListID: string) => void
  removeTodoList: (todoListID: string) => void
  changeFilter: (FilterValues: FilterValuesType, todoListID: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
  changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
  removeTask: (taskID: string, todoListID: string) => void
  changeTodoListTitle: (title: string, todoListID: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {
  console.log('Todolist is called')

  const {filter} = props

  const todo = useSelector<AppRootStateType, TodoListType>(state => state.todolists.filter(t => t.id === props.todoListID)[0])
  const tasksSel = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID])

  const dispatch = useDispatch()

  const tasksJSXElements = props.tasks.map(t => {
    const removeTask = () => props.removeTask(t.id, props.todoListID)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
    }
    const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)

    return <Task
      task={t}
      changeTaskStatus={props.changeTaskStatus}
      changeTaskTitle={props.changeTaskTitle}
      removeTask={props.removeTask}
      todoListID={props.todoListID}
      key={t.id}
    />
  })

  const addTask = useCallback((title: string) => {
    props.addTask(title, props.todoListID)
  },[props.addTask, props.todoListID])

  const removeTodoList = () => {
    props.removeTodoList(props.todoListID)
  }

  const changeTodoListTitle = useCallback ((title: string) => props.changeTodoListTitle(title, props.todoListID),
    [props.todoListID, props.changeTodoListTitle])

  const onClickAllFilter = useCallback(() => props.changeFilter('all', props.todoListID),[props.changeFilter, props.todoListID])
  const onClickActiveFilter = useCallback(() => props.changeFilter('active', props.todoListID),[props.changeFilter, props.todoListID])
  const onClickCompletedFilter = useCallback(() => props.changeFilter('completed', props.todoListID),[props.changeFilter, props.todoListID])

  let tasksForTodolist = props.tasks;

  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter(t => !t.isDone)
  }
  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(t => t.isDone)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
        <IconButton onClick={removeTodoList}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>
      {tasksJSXElements}
      <div>
        <Button
          variant={filter === 'all' ? 'outlined' : 'text'}
          onClick={onClickAllFilter}
          color={'default'}
        >All</Button>
        <Button
          variant={filter === 'active' ? 'outlined' : 'text'}
          onClick={onClickActiveFilter}
          color={'primary'}
        >Active</Button>
        <Button
          variant={filter === 'completed' ? 'outlined' : 'text'}
          onClick={onClickCompletedFilter}
          color={'secondary'}
        >Completed</Button>
      </div>
    </div>
  )
})

export default TodoList;