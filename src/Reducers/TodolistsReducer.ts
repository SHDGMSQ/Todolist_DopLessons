import {FilterValuesType, TodolistsType} from "../App";

export const TodolistsReducer = (state: Array<TodolistsType>, action: GeneralType) => {
    switch (action.type) {
        case 'CHANGE-TASKS': {
            //setTodolists(todolists.map( m => m.id === todolistID? {...m, filter:value}: m ))
            return state.map( m => m.id === action.preload.todolistID ? {...m, filter: action.preload.value}: m )
        }
        case 'REMOVE-TODOLIST': {
            //setTodolists(todolists.filter( f => f.id !== todolistID ))
            return state.filter( f => f.id !== action.preload.todolistID )
        }
        case 'ADD-TODOLIST': {
            //let newTodolist: TodolistsType = {id: v1(), title, filter: 'all'}
            //setTodolists([newTodolist, ...todolists])
            let newTodolist: TodolistsType = {id: action.preload.newTodolistId, title: action.preload.title, filter: 'all'}
            return [newTodolist, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            //setTodolists(todolists.map( m => m.id === todolistID ? {...m, title} : m ))
            return state.map( m => m.id === action.preload.todolistID ? {...m, title: action.preload.title}: m )
        }
        default: return state
    }
}

type GeneralType = changeTasksACType
| removeTodolistACType
| addTodolistACType
| changeTodolistTitleACType

type changeTasksACType = ReturnType<typeof changeTasksAC>
export const changeTasksAC = (todolistID: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-TASKS',
        preload: {
            todolistID,
            value
        }
    } as const
}

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        preload: {
            todolistID
        }
    } as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolistId: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        preload: {
            newTodolistId,
            title
        }
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistID: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        preload: {
            todolistID,
            title
        }
    } as const
}