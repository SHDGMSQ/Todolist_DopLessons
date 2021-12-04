import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import { v1 } from 'uuid';


export type FilterValuesType = 'all' | 'active' | 'completed'

const App = () => {

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "REACTJS", isDone: false},
        {id: v1(), title: "restIP", isDone: true},
        {id: v1(), title: "graphQL", isDone: false},
    ])

    const removeTask = (id: string) => {
        let newTask = tasks.filter(t => t.id !== id)
        setTasks(newTask)
    }
    const addTask = (title:string) => {
        let task = {id: v1(), title: title, isDone: true }
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }

    let tasksForTodolist = tasks

    if (filter === 'active')
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    if (filter === 'completed')
        tasksForTodolist = tasks.filter(t => t.isDone === true)

    const changeTasks = (value: FilterValuesType) => {
        setFilter(value)
    }

    return (
        <div className="App">
          <TodoList
              title="What to learn"
              tasks={tasksForTodolist}
              removeTask={removeTask}
              changeTasks={changeTasks}
              addTask={addTask}

          />
        </div>
    );
}

export default App;
