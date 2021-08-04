import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TasksStateType, TaskType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {removeTodoListAC} from "./state/todolists-reducer";

export type TaskPropsType = {
  todolistId: string
  task: TaskType
}



export const TaskWithDispatch = React.memo((props:TaskPropsType) => {

  // console.log('TaskWithDispatch')


  const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todolistId]
    .filter(task => task.id === props.task.id)[0])

  const dispatch = useDispatch()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked
    const action = changeTaskStatusAC(task.id, newIsDoneValue, props.todolistId)
    dispatch(action)
  }

  const onTitleChangeHandler = (newValue: string) => {
    const action = changeTaskTitleAC(props.task.id, newValue, props.todolistId)
    dispatch(action)
  }

  const onClickHandler = () => {
    const action = removeTaskAC(props.todolistId, props.todolistId)
    dispatch(action)
  }

  return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
    <Checkbox
      checked={props.task.isDone}
      color="primary"
      onChange={onChangeHandler}
    />
    <EditableSpan title={props.task.title} changeTitle={onTitleChangeHandler}/>
    <IconButton onClick={onClickHandler}>
      <Delete/>
    </IconButton>
  </div>
})