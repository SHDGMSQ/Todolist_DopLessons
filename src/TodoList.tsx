import React from "react";
import {FilterValuesType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeTasks: (value: FilterValuesType) => void
}

function TodoList(props: PropsType) {


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => <li key={t.id}>
                        <input type='checkbox' checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ () => {props.removeTask(t.id)}}>x</button>
                    </li>)
                }



            </ul>
            <div>
                <button onClick={ () => {props.changeTasks('all')} }>All</button>
                <button onClick={ () => {props.changeTasks('active')} }>Active</button>
                <button onClick={ () => {props.changeTasks('completed')} }>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;