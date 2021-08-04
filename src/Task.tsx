import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

export type TaskPropsType = {
  todolistId: string
  task: TaskType
  changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
  changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
  removeTask: (taskID: string, todoListID: string) => void
}



export const Task = React.memo((props:TaskPropsType) => {

  // console.log('Task')
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked
    props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
  }

  const onTitleChangeHandler = (newValue: string) => {
    props.changeTaskTitle(props.task.id, newValue, props.todolistId)
  }

  const onClickHandler = () => {
    props.removeTask(props.task.id, props.todolistId)
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