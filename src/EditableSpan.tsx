import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Input} from '@material-ui/core';

type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
}

 const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log('EditableSpan called')
  const [title, setTitle] = useState<string>(props.title)
  const [editMode, setEditMode] = useState<boolean>(false)
  const onEditMode = () => setEditMode(true)
  const offEditMode = () => {
    setEditMode(false)
    props.changeTitle(title)
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onEnterPressOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      offEditMode()
    }
  }

  return (
    editMode
      ? <Input
        color={'primary'}
        value={title}
        autoFocus
        onBlur={offEditMode}
        onChange={onChangeTitle}
        onKeyPress={onEnterPressOffEditMode}
      />
      : <span onDoubleClick={onEditMode}>{props.title}</span>
  )
})

export default EditableSpan;