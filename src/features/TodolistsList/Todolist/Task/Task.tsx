import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";

export type TaskPropsType = {
    todolistId: string
    task: TaskType
    changeTaskStatus: (taskID: string, status: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    // console.log('Task')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }

    const onTitleChangeHandler = (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }

    const onClickHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}
            />
            <EditableSpan title={props.task.title} changeTitle={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler} size="large">
                <Delete/>
            </IconButton>
        </div>
    );
})