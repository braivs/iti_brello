import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "../EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "../AppWithRedux";

type TasksPropsType = {
  todoListID: string
  task: TaskType
  removeTask: (taskID: string, todoListID: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
  changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}

export const Tasks = React.memo((props: TasksPropsType) => {

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListID)
  },[])

  const onTitleChangeHandler = useCallback((title: string) => {
    props.changeTaskTitle(props.task.id, title, props.todoListID)
  },[])

  const onClickHandler = useCallback(() => {
    props.removeTask(props.task.id, props.todoListID)
  },[])


  return <div key={props.tasks.id} className={props.tasks.isDone ? 'is-done' : ''}>
    <Checkbox
      checked={props.tasks.isDone}
      color="primary"
      onChange={onClickHandler}
    />
    <EditableSpan title={props.tasks.title} changeTitle={onTitleChangeHandler}/>
    <IconButton onClick={onClickHandler}>
      <Delete/>
    </IconButton>
  </div>
})