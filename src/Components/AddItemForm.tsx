import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType ={
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [error, setError] = useState<string | null>(null)
    let [title, setTitle] = useState("")

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const enterInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            return addTask();
    }
    const addTask = () => {
        if (title === ''){
            setError('Title is required')
            return
        } else{
            props.addItem(title.trim())
            setTitle("")
        }}
    return (
        <div>
            <input className={error? 'error': ''}
                   value={title}
                   onChange={onChangeInput}
                   onKeyPress={enterInput}
            />
            <button onClick={addTask}>+</button>
            <div className={error? 'error-message': ''}>{error}</div>
        </div>
    )
}
