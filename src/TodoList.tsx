import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {KeyboardEvent} from "react";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, id: string) => void
    changeTasks: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    todolistID: string
    filter: FilterValuesType
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
}

function TodoList(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title === ''){
            setError('Title is required')
            return
        } else{
        props.addTask(props.todolistID, title.trim())
        setTitle("")
    }}
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const enterInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            return addTask();
    }
    const onClickAllHandler = () => props.changeTasks(props.todolistID, 'all')
    const onClickActiveHandler = () => props.changeTasks(props.todolistID, 'active')
    const onClickCompletedHandler = () => props.changeTasks(props.todolistID, 'completed')
    const onClickRemoveHandler = () => props.removeTodolist(props.todolistID)

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={onClickRemoveHandler}>X</button>
            </h3>
            <div>
                <input className={error? 'error': ''}
                        value={title}
                       onChange={onChangeInput}
                       onKeyPress={enterInput}
                />
                <button onClick={addTask}>+</button>
                <div className={error? 'error-message': ''}>{error}</div>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const removeTaskHandler = () => props.removeTask(props.todolistID, t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked)
                        return <li key={t.id}
                                   className={t.isDone ? 'is-done' : ''}>
                            <input onChange={onChangeHandler}
                                   type='checkbox'
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={removeTaskHandler}>x
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onClickAllHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onClickActiveHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onClickCompletedHandler}>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;