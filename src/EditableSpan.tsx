import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {Input, TextField} from '@material-ui/core';

type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(props.title)

  const onEditMode = () => setEditMode(true)
  const offEditMOde = () => {
    setEditMode(false)
    props.changeTitle(title)
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  return (
    editMode
    ? <Input
        color={'primary'}
        value={title}
        autoFocus
        onChange={onChangeTitle}
        onBlur={offEditMOde}
      />
    : <span onDoubleClick={onEditMode}>{props.title}</span>
  )
}

export default EditableSpan;