import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import { v1 } from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

const App = () => {

/*
    let [filter, setFilter] = useState<FilterValuesType>('all')

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "REACTJS", isDone: false},
        {id: v1(), title: "restIP", isDone: true},
        {id: v1(), title: "graphQL", isDone: false},
    ])
*/

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTask = (todolistID: string ,id: string) => {
        setTasks({...tasks, [todolistID]:tasks[todolistID].filter( f => f.id !== id )})
    }
    const addTask = (todolistID: string ,title:string) => {
        let newTask = {id: v1(), title: title, isDone: false }
        setTasks({...tasks, [todolistID]:[newTask,...tasks[todolistID]]})
    }
    const changeTasks = (todolistID: string, value: FilterValuesType) => {
        setTodolists(todolists.map( m => m.id === todolistID? {...m, filter:value}: m ))
    }
    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]:tasks[todolistID].map( m => m.id === taskId? {...m, isDone}: m )})
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter( f => f.id !== todolistID ))
        delete tasks[todolistID]
        console.log(tasks)
    }
    const addTodolist = (title: string) => {
        let newTodolist: TodolistsType = {id: v1(), title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]:[]})
    }
    const updateTaskTitle = (todolistID: string, taskId: string , title: string) => {
        setTasks({...tasks, [todolistID]:tasks[todolistID].map( m => m.id === taskId ? {...m, title}: m )})
    }

    return (
        <div className="App">
            <AddItemForm
                addItem={addTodolist}
            />
            {todolists.map( m => {
                let tasksForTodolist = tasks[m.id]
                if (m.filter === 'active')
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === false)
                if (m.filter === 'completed')
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === true)
                return (
                    <TodoList
                        title={m.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeTasks={changeTasks}
                        addTask={addTask}
                        todolistID={m.id}
                        filter={m.filter}
                        changeTaskStatus={changeStatus}
                        removeTodolist={removeTodolist}
                        updateTaskTitle={updateTaskTitle}

                    />
                )
            } )}

        </div>
    );
}

export default App;
