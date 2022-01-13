import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {KeyboardEvent} from "react";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";

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
    updateTaskTitle: (todolistID: string, taskId: string, title: string) => void
}

function TodoList(props: PropsType) {

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    const onClickAllHandler = () => props.changeTasks(props.todolistID, 'all')
    const onClickActiveHandler = () => props.changeTasks(props.todolistID, 'active')
    const onClickCompletedHandler = () => props.changeTasks(props.todolistID, 'completed')
    const onClickRemoveHandler = () => props.removeTodolist(props.todolistID)
    const removeTaskHandler = (taskId: string) => props.removeTask(props.todolistID, taskId)
    const onChangeHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistID, taskId, e.currentTarget.checked)
    const onChangeTitleHandler = (taskId: string, newTitle: string) => {
        props.updateTaskTitle(props.todolistID, taskId, newTitle)
    }
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={onClickRemoveHandler}>X</button>
            </h3>
            <div>
                <AddItemForm
                    addItem={addTaskHandler}
                />
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        return <li key={t.id}
                                   className={t.isDone ? 'is-done' : ''}>
                            <input onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(t.id, e)}
                                   type='checkbox'
                                   checked={t.isDone}/>
                            <EditableSpan
                                title={t.title}
                                onChange={ (newTitle: string) => onChangeTitleHandler (t.id, newTitle)}
                            />
                            <button onClick={() => removeTaskHandler(t.id)}>x
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