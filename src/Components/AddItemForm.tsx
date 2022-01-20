import React, {ChangeEvent, KeyboardEvent, useReducer, useState} from "react";
import {addTaskErrorAC, ErrorAddItemFormReducer, onChangeInputErrorAC} from "../Reducers/ErrorAddItemFormReducer";
import {addTaskTitleAC, onChangeInputTitleAC, TitleAddItemFormReducer} from "../Reducers/TitleAddItemFormReducer";

type AddItemFormPropsType ={
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [error, errorDispatch] = useReducer(ErrorAddItemFormReducer, null)
    let [title, titleDispatch] = useReducer(TitleAddItemFormReducer, "")

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        //setError(null)
        //setTitle(e.currentTarget.value)
        errorDispatch(onChangeInputErrorAC())
        titleDispatch(onChangeInputTitleAC(e))
    }
    const enterInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            return addTask();
    }
    const addTask = () => {
       /* if (title === ''){
            //setError('Title is required')
            return
        } else{
            props.addItem(title.trim())
            //setTitle("")
        }*/
        if (title === '') {
            errorDispatch(addTaskErrorAC())
            return
        } else {
            props.addItem(title.trim())
            titleDispatch(addTaskTitleAC())
        }
    }
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
