import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./AppWithRedux";
import {EditableSpan} from "./EditableSpan";

type TasksPropsType = {
  changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
  changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
  removeTask: (taskID: string, todoListID: string) => void
  task: TaskType
  todoListID: string
}

export const Task = React.memo((props: TasksPropsType) => {

  const onClickHandler = useCallback(() => {
    props.removeTask(props.task.id, props.todoListID)
  },[])

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListID)
  },[])

  const onTitleChangeHandler = useCallback((title: string) => {
    props.changeTaskTitle(props.task.id, title, props.todoListID)
  },[props.task.id, props.changeTaskTitle, props.todoListID])




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