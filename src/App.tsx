import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./TodoList";
import { v1 } from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {
    addTaskAC,
    addTasksForNewTodolistAC,
    changeStatusAC,
    removeTaskAC,
    TasksReducer,
    updateTaskTitleAC
} from "./Reducers/TasksReducer";
import {
    addTodolistAC,
    changeTasksAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistsReducer
} from "./Reducers/TodolistsReducer";


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

const App = () => {

    //init commit
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

    let [todolists, todolistsDispatch] = useReducer(TodolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, tasksDispatch] = useReducer(TasksReducer, {
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
        //setTasks({...tasks, [todolistID]:tasks[todolistID].filter( f => f.id !== id )})
        tasksDispatch(removeTaskAC(todolistID, id))
    }
    const addTask = (todolistID: string ,title:string) => {
        //let newTask = {id: v1(), title: title, isDone: false }
        //setTasks({...tasks, [todolistID]:[newTask,...tasks[todolistID]]})
        tasksDispatch(addTaskAC(todolistID, title))
    }
    const changeTasks = (todolistID: string, value: FilterValuesType) => {
        //setTodolists(todolists.map( m => m.id === todolistID? {...m, filter:value}: m ))
        todolistsDispatch(changeTasksAC(todolistID, value))
    }
    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        //setTasks({...tasks, [todolistID]:tasks[todolistID].map( m => m.id === taskId? {...m, isDone}: m )})
        tasksDispatch(changeStatusAC(todolistID, taskId, isDone))
    }
    const removeTodolist = (todolistID: string) => {
        //setTodolists(todolists.filter( f => f.id !== todolistID ))
        todolistsDispatch(removeTodolistAC(todolistID))
        delete tasks[todolistID]
        console.log(tasks)
    }
    const addTodolist = (title: string) => {
        //let newTodolist: TodolistsType = {id: v1(), title, filter: 'all'}
        //setTodolists([newTodolist, ...todolists])
        //setTasks({...tasks, [newTodolist.id]:[]})
        let newTodolistId = v1();
        todolistsDispatch(addTodolistAC(newTodolistId, title))
        tasksDispatch(addTasksForNewTodolistAC(newTodolistId))
    }
    const updateTaskTitle = (todolistID: string, taskId: string , title: string) => {
        //setTasks({...tasks, [todolistID]:tasks[todolistID].map( m => m.id === taskId ? {...m, title}: m )})
        tasksDispatch(updateTaskTitleAC(todolistID, taskId, title))
    }
    const changeTodolistTitle = (todolistID: string, title: string) => {
        //setTodolists(todolists.map( m => m.id === todolistID ? {...m, title} : m ))
        todolistsDispatch(changeTodolistTitleAC(todolistID, title))
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
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            } )}

        </div>
    );
}

export default App;
