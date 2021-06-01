import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
  const [title, setTitle] = useState<string>(props.title)
  const [editMode, setEditMode] = useState<boolean>(false)
  const onEditMode = () => setEditMode(true)
  const offEditMode = () => {
    setEditMode(false)
    props.changeTitle(title)
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onEnterPressOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      offEditMode()
    }
  }

  return (
    editMode
      ? <input
        value={title}
        autoFocus
        onBlur={offEditMode}
        onChange={onChangeTitle}
        onKeyPress={onEnterPressOffEditMode}
      />
      : <span onDoubleClick={onEditMode}>{props.title}</span>
  )
}

export default EditableSpan;