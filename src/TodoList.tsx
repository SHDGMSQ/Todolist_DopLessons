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
    removeTask: (id: string) => void
    changeTasks: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

function TodoList(props: PropsType) {

    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const enterInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            return addTask();
    }
    const onClickAllHandler = () => props.changeTasks('all')
    const onClickActiveHandler = () => props.changeTasks('active')
    const onClickCompletedHandler = () => props.changeTasks('completed')


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeInput}
                       onKeyPress={enterInput}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const removeTaskHandler = () => props.removeTask(t.id)

                        return <li key={t.id}>
                            <input type='checkbox' checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={removeTaskHandler}>x
                            </button>
                        </li>
                    })
                }


            </ul>
            <div>
                <button onClick={onClickAllHandler}>All</button>
                <button onClick={onClickActiveHandler}>Active</button>
                <button onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;