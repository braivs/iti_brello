import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

const AddItemForm = React.memo(function ({addItem, disabled = false}: AddItemFormPropsType) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<boolean | string>(false)

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    if (error !== null) {
      setError(false)
    }
  }
  const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddItem()
    }
  }
  const onClickAddItem = () => {
    const validatedTitle = title.trim()
    if (validatedTitle) {
      addItem(validatedTitle)
    } else {
      setError(true)
    }
    setTitle('')
  }

  const errorMessage = error
    ? <div style={{color: 'red'}}>Title is required!</div>
    : null

  return (
    <div>
      <TextField variant="outlined"
                 disabled={disabled}
                 error={!!error}
                 value={title}
                 onChange={onChangeTitle}
                 onKeyPress={onKeyPressAddItem}
                 label='Text'
                 helperText={errorMessage}
      />
      <IconButton color='primary' onClick={onClickAddItem} disabled={disabled}>
        <AddBox />
      </IconButton>
    </div>
  )
})

export default AddItemForm;