import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed'

const App = () => {

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let [tasks, setTasks] = useState([
        {id:1, title: "HTML&CSS", isDone: true},
        {id:2, title: "JS", isDone: true},
        {id:3, title: "REACTJS", isDone: false},
        {id:4, title: "restIP", isDone: true},
        {id:5, title: "graphQL", isDone: false},
    ])

    const removeTask = (id: number) => {
        let newTask = tasks.filter(t => t.id !== id)
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

          />
        </div>
    );
}

export default App;
