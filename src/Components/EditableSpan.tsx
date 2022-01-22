import React, {ChangeEvent, KeyboardEvent, useReducer, useState} from "react";
import {EditReducer, onBlurHandlerAC, onDoubleClickEditAC, onKeyPressEditAC} from "../Reducers/EditReducer";
import {onChangeTitleAC, onDoubleClickTitleAC, TitleEditableSpanReducer} from "../Reducers/TitleEditableSpanReducer";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, editDispatch] = useReducer(EditReducer, true)
    const [title, titleDispatch] = useReducer(TitleEditableSpanReducer, '')

    const onDoubleClickHandler = () => {
        //setTitle(props.title)
        titleDispatch(onDoubleClickTitleAC(props.title))
        editDispatch(onDoubleClickEditAC())
    }
    const onBlurHandler = () => {
        editDispatch(onBlurHandlerAC())
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //setTitle(e.currentTarget.value)
        titleDispatch(onChangeTitleAC(e.currentTarget.value))
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            editDispatch(onKeyPressEditAC())
            props.onChange(title)
        }
    }
    return edit
        ? <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
        : <input value={title}
                 onBlur={onBlurHandler}
                 autoFocus
                 onChange={onChangeHandler}
                 onKeyPress={onKeyPressHandler}
        />


}