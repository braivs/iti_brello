import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<boolean>(false)

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }
  const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddItem()
    }
  }
  const onClickAddItem = () => {
    const validatedTitle = title.trim()
    if (validatedTitle) {
      props.addItem(validatedTitle)
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
      <input className={error ? 'error' : ''}
             value={title}
             onChange={onChangeTitle}
             onKeyPress={onKeyPressAddItem}
      />
      <button onClick={onClickAddItem}>+</button>
      {errorMessage}
    </div>
  )
}

export default AddItemForm;