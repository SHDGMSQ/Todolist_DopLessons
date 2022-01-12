import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(true)
    const [title, setTitle] = useState('')

    const onDoubleClickHandler = () => {
        setTitle(props.title)
        setEdit(false)
    }
    const onBlurHandler = () => {
        setEdit(true)
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return edit
        ? <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
        : <input value={title}
                 onBlur={onBlurHandler}
                 autoFocus
                onChange={onChangeHandler}
        />



}