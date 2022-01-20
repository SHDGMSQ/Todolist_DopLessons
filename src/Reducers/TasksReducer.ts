import {v1} from "uuid"

export const TasksReducer = (state: { [x: string]: { id: string; title: string; isDone: boolean; }[]; }, action: GeneralType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            //setTasks({...tasks, [todolistID]:tasks[todolistID].filter( f => f.id !== id )})
            return {
                ...state,
                [action.preload.todolistID]: state[action.preload.todolistID].filter(f => f.id !== action.preload.id)
            }
        }
        case 'ADD-TASK': {
            //let newTask = {id: v1(), title: title, isDone: false }
            //setTasks({...tasks, [todolistID]:[newTask,...tasks[todolistID]]})
            let newTask = {id: v1(), title: action.preload.title, isDone: false}
            return {...state, [action.preload.todolistID]: [newTask, ...state[action.preload.todolistID]]}
        }
        case 'CHANGE-STATUS': {
            //setTasks({...tasks, [todolistID]:tasks[todolistID].map( m => m.id === taskId? {...m, isDone}: m )})
            return {
                ...state,
                [action.preload.todolistID]: state[action.preload.todolistID].map(m => m.id === action.preload.taskId ? {
                    ...m,
                    isDone: action.preload.isDone
                } : m)
            }
        }
        case 'ADD-TASKS-FOR-NEW-TODOLIST': {
            //setTasks({...tasks, [newTodolist.id]:[]})
            return {...state, [action.preload.newTodolistId]: []}
        }
        case 'UPDATE-TASK-TITLE': {
            //setTasks({...tasks, [todolistID]:tasks[todolistID].map( m => m.id === taskId ? {...m, title}: m )})
            return {
                ...state,
                [action.preload.todolistID]: state[action.preload.todolistID].map(m => m.id === action.preload.taskId ? {
                    ...m,
                    title: action.preload.title
                } : m)
            }
        }
        default:
            return state
    }
}
type GeneralType = removeTaskACType
    | addTaskACType
    | changeStatusACType
    | addTasksForNewTodolistACType
    | updateTaskTitleACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        preload: {
            todolistID,
            id
        }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        preload: {
            todolistID,
            title
        }
    } as const
}

type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todolistID: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        preload: {
            todolistID,
            taskId,
            isDone
        }
    } as const
}

type addTasksForNewTodolistACType = ReturnType<typeof addTasksForNewTodolistAC>
export const addTasksForNewTodolistAC = (newTodolistId: string) => {
    return {
        type: 'ADD-TASKS-FOR-NEW-TODOLIST',
        preload: {
            newTodolistId
        }
    } as const
}

type updateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>
export const updateTaskTitleAC = (todolistID: string, taskId: string, title: string) => {
    return {
        type: 'UPDATE-TASK-TITLE',
        preload: {
            todolistID,
            taskId,
            title
        }
    } as const
}